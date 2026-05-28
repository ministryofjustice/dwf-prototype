(function () {
  'use strict'

  var DATE_LABELS = {
    CRD: 'Conditional release date',
    LED: 'Licence expiry date',
    SED: 'Sentence expiry date',
    HDCED: 'Home detention curfew eligibility date',
    TUSED: 'Top-up supervision expiry date',
    PED: 'Parole eligibility date',
    NPD: 'Non-parole date',
    ARD: 'Automatic release date'
  }
  var DATE_KEYS = ['CRD', 'LED', 'SED', 'HDCED', 'TUSED', 'PED', 'NPD', 'ARD']

  var CALCULATED_DATES_HTML = [
    '<div class="app-stat-card-grid">',
    '<div class="app-stat-card"><div class="app-stat-card__header"><p class="govuk-heading-s govuk-!-margin-bottom-1">CRD</p></div><p class="app-stat-card__description govuk-hint">Conditional release date</p><p class="govuk-body govuk-!-margin-bottom-1">14 November 2027</p></div>',
    '<div class="app-stat-card"><div class="app-stat-card__header"><p class="govuk-heading-s govuk-!-margin-bottom-1">LED</p></div><p class="app-stat-card__description govuk-hint">Licence expiry date</p><p class="govuk-body govuk-!-margin-bottom-1">14 May 2028</p></div>',
    '<div class="app-stat-card"><div class="app-stat-card__header"><p class="govuk-heading-s govuk-!-margin-bottom-1">HDCED</p></div><p class="app-stat-card__description govuk-hint">Home detention curfew eligibility date</p><p class="govuk-body govuk-!-margin-bottom-1">2 August 2027</p></div>',
    '<div class="app-stat-card"><div class="app-stat-card__header"><p class="govuk-heading-s govuk-!-margin-bottom-1">PED</p></div><p class="app-stat-card__description govuk-hint">Parole eligibility date</p><p class="govuk-body govuk-!-margin-bottom-1">15 March 2027</p></div>',
    '<div class="app-stat-card"><div class="app-stat-card__header"><p class="govuk-heading-s govuk-!-margin-bottom-1">ARD</p></div><p class="app-stat-card__description govuk-hint">Automatic release date</p><p class="govuk-body govuk-!-margin-bottom-1">30 November 2026</p></div>',
    '</div>'
  ].join('')

  function buildDetailHTML (calc, index) {
    var overrideBlock = ''
    if (calc.manualOverride && calc.source !== 'NOMIS') {
      overrideBlock = '<div class="govuk-inset-text govuk-!-margin-top-4 govuk-!-margin-bottom-4">' +
        'This calculation was manually overridden. The reason provided was &ldquo;' + escapeHTML(calc.manualOverride.reason) + '&rdquo;.' +
        '</div>'
    }

    var dateCards = DATE_KEYS.map(function (key) {
      var entry = calc.dates[key] || { value: 'N/A' }
      if (entry.value === 'N/A') return ''
      return '<div class="app-stat-card">' +
        '<div class="app-stat-card__header">' +
          '<p class="govuk-heading-s govuk-!-margin-bottom-1">' + key + '</p>' +
        '</div>' +
        '<p class="app-stat-card__description govuk-hint">' + escapeHTML(DATE_LABELS[key]) + '</p>' +
        '<p class="govuk-body govuk-!-margin-bottom-1">' + escapeHTML(entry.value) + '</p>' +
        '</div>'
    }).join('')

    var calculatedDatesBlock = ''
    if (calc.manualOverride && calc.source !== 'NOMIS') {
      calculatedDatesBlock = '<details class="govuk-details govuk-!-margin-bottom-4">' +
        '<summary class="govuk-details__summary">' +
          '<span class="govuk-details__summary-text">View calculated dates</span>' +
        '</summary>' +
        '<div class="govuk-details__text">' + CALCULATED_DATES_HTML + '</div>' +
        '</details>'
    }

    var buttonsBlock = ''
    if (index === 0 && calc.source !== 'NOMIS') {
      buttonsBlock = '<div class="govuk-button-group govuk-!-margin-bottom-6">' +
        '<button type="button" class="govuk-button govuk-button--secondary">Print notification slip</button>' +
        '<button type="button" class="govuk-button govuk-button--secondary">Record a counter check</button>' +
        '</div>'
    }

    var adjCards = (calc.adjustments && calc.adjustments.length)
      ? calc.adjustments.map(function (a) { return '<p class="govuk-body-s govuk-!-margin-bottom-0"><strong>' + escapeHTML(a) + '</strong></p>' }).join('')
      : '<p class="govuk-body-s">None</p>'

    var isCrds = calc.source !== 'NOMIS'
    var colClass = isCrds ? 'govuk-grid-column-one-quarter' : 'govuk-grid-column-one-third'

    var checkedByHTML = ''
    if (isCrds) {
      var checkerContent = (calc.checkedBy && calc.checkedBy.length)
        ? calc.checkedBy.map(function (c) {
            return '<span class="govuk-!-display-block">' + escapeHTML(c.name) + '</span>' +
              '<span class="govuk-hint govuk-!-margin-bottom-1">' + escapeHTML(c.date) + '</span>'
          }).join('')
        : 'Not checked'
      checkedByHTML = '<div class="' + colClass + '">' +
        '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Checked by</strong>' +
        checkerContent + '</p></div>'
    }

    return '<h2 class="govuk-heading-l" id="calc-detail-heading">Calculation on ' + escapeHTML(calc.date) + '</h2>' +
      '<div class="govuk-grid-row govuk-!-margin-bottom-2">' +
        '<div class="' + colClass + '">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Calculation reason</strong>' + escapeHTML(calc.reason) + '</p>' +
        '</div>' +
        '<div class="' + colClass + '">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Establishment</strong>' + escapeHTML(calc.calculator) + ' at ' + escapeHTML(calc.establishment) + '</p>' +
        '</div>' +
        '<div class="' + colClass + '">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Source</strong>' + escapeHTML(calc.source) + '</p>' +
        '</div>' +
        checkedByHTML +
      '</div>' +
      overrideBlock +
      '<h3 class="govuk-heading-m">Release dates</h3>' +
      '<div class="app-stat-card-grid govuk-!-margin-bottom-4">' + dateCards + '</div>' +
      calculatedDatesBlock +
      buttonsBlock +
      (calc.source !== 'NOMIS'
        ? '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">' +
          '<h3 class="govuk-heading-m">Included in this calculation</h3>' +
          '<div class="app-stat-card-grid app-stat-card-grid--thirds govuk-!-margin-bottom-4">' +
            '<div class="app-stat-card">' +
              '<p class="govuk-body govuk-!-margin-bottom-0">Court cases</p>' +
              '<p class="govuk-heading-m govuk-!-margin-bottom-0">' + escapeHTML(String(calc.courts)) + '</p>' +
            '</div>' +
            '<div class="app-stat-card">' +
              '<p class="govuk-body govuk-!-margin-bottom-0">Sentences</p>' +
              '<p class="govuk-heading-m govuk-!-margin-bottom-0">' + escapeHTML(String(calc.sentences)) + '</p>' +
            '</div>' +
            '<div class="app-stat-card">' +
              '<p class="govuk-body govuk-!-margin-bottom-0">Adjustments</p>' +
              adjCards +
            '</div>' +
          '</div>' +
          '<a href="/28/calculation-history-mvp-court-cases?selected=' + index + '" class="govuk-link govuk-body">View all court cases and adjustments information</a>'
        : '')
  }

  function escapeHTML (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function updateNavRows (index) {
    var rows = document.querySelectorAll('[data-calc-index]')
    rows.forEach(function (row) {
      var rowIndex = parseInt(row.getAttribute('data-calc-index'), 10)
      var listItem = row.parentElement
      if (rowIndex === index) {
        listItem.classList.add('moj-side-navigation__item--active')
        row.setAttribute('aria-current', 'location')
      } else {
        listItem.classList.remove('moj-side-navigation__item--active')
        row.removeAttribute('aria-current')
      }
    })
  }

  function loadCalc (index, fallbackUrl) {
    fetch('/28/api/calc-mvp/' + index)
      .then(function (response) {
        if (!response.ok) throw new Error('Response not OK: ' + response.status)
        return response.json()
      })
      .then(function (calc) {
        if (!calc) throw new Error('No calc data returned')
        var panel = document.getElementById('calc-detail-panel')
        panel.innerHTML = buildDetailHTML(calc, index)
        history.pushState(null, '', '?selected=' + index)
        updateNavRows(index)
        var heading = document.getElementById('calc-detail-heading')
        if (heading) heading.focus()
      })
      .catch(function () {
        window.location.href = fallbackUrl
      })
  }

  function extractSelectedFromHref (href) {
    var match = href && href.match(/[?&]selected=(\d+)/)
    return match ? parseInt(match[1], 10) : null
  }

  document.addEventListener('DOMContentLoaded', function () {
    var panel = document.getElementById('calc-detail-panel')
    if (!panel) return

    document.addEventListener('click', function (e) {
      var row = e.target.closest('[data-calc-index]')
      if (!row) return
      e.preventDefault()
      var index = parseInt(row.getAttribute('data-calc-index'), 10)
      loadCalc(index, row.href)
    })

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-nav-btn]')
      if (!btn || btn.tagName !== 'A') return
      e.preventDefault()
      var index = extractSelectedFromHref(btn.getAttribute('href'))
      if (index === null) {
        window.location.href = btn.href
        return
      }
      loadCalc(index, btn.href)
    })

    window.addEventListener('popstate', function () {
      var params = new URLSearchParams(window.location.search)
      var index = parseInt(params.get('selected') || '0', 10)
      if (isNaN(index)) index = 0
      loadCalc(index, '?selected=' + index)
    })
  })
}())
