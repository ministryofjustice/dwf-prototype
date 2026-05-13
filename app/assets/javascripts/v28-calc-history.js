(function () {
  'use strict'

  var COURT_CASE_DETAIL_HTML = [
    '<h3 class="govuk-heading-s govuk-!-margin-bottom-4">T20250103 at Sheffield Crown Court</h3>',
    '<div class="offence-card sentence-card govuk-!-margin-bottom-4"><div class="offence-card-offence-details">',
    '<span class="govuk-body">Count 1</span>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">AB06001 \u2014 Obstruct person acting in execution of the regulations</h4>',
    '<dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Committed on</dt><dd class="govuk-summary-list__value">1 January 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence date</dt><dd class="govuk-summary-list__value">20 March 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence type</dt><dd class="govuk-summary-list__value">SDS (Standard Determinate Sentence)</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence length</dt><dd class="govuk-summary-list__value">1 year 0 months</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Consecutive or concurrent</dt><dd class="govuk-summary-list__value">Forthwith</dd></div>',
    '</dl></div></div>',
    '<div class="offence-card sentence-card govuk-!-margin-bottom-4"><div class="offence-card-offence-details">',
    '<span class="govuk-body">Count 2</span>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">AB13001 \u2014 Fail to comply with an animal by-product requirement</h4>',
    '<dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Committed on</dt><dd class="govuk-summary-list__value">1 January 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence date</dt><dd class="govuk-summary-list__value">20 March 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence type</dt><dd class="govuk-summary-list__value">SDS (Standard Determinate Sentence)</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence length</dt><dd class="govuk-summary-list__value">5 years 0 months</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Consecutive or concurrent</dt><dd class="govuk-summary-list__value">Concurrent</dd></div>',
    '</dl></div></div>',
    '<h3 class="govuk-heading-s govuk-!-margin-bottom-4">T20250102 at Manchester Crown Court</h3>',
    '<div class="offence-card sentence-card govuk-!-margin-bottom-4"><div class="offence-card-offence-details">',
    '<span class="govuk-body">Count 1</span>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">AB13002 \u2014 Intentionally obstruct an authorised person</h4>',
    '<dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Committed on</dt><dd class="govuk-summary-list__value">30 December 2024</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence date</dt><dd class="govuk-summary-list__value">12 February 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence type</dt><dd class="govuk-summary-list__value">SDS (Standard Determinate Sentence)</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence length</dt><dd class="govuk-summary-list__value">3 years 0 months</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Consecutive or concurrent</dt><dd class="govuk-summary-list__value">Forthwith</dd></div>',
    '</dl></div></div>',
    '<div class="offence-card sentence-card govuk-!-margin-bottom-4"><div class="offence-card-offence-details">',
    '<span class="govuk-body">Count 2</span>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">AB13003 \u2014 Fail to give to an authorised person information / assistance</h4>',
    '<dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Committed on</dt><dd class="govuk-summary-list__value">30 December 2024</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence date</dt><dd class="govuk-summary-list__value">12 February 2025</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence type</dt><dd class="govuk-summary-list__value">SDS (Standard Determinate Sentence)</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Sentence length</dt><dd class="govuk-summary-list__value">2 years 0 months</dd></div>',
    '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Consecutive or concurrent</dt><dd class="govuk-summary-list__value">Concurrent</dd></div>',
    '</dl></div></div>',
    '<h3 class="govuk-heading-m govuk-!-margin-bottom-4">Adjustments</h3>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">Deductions</h4>',
    '<h5 class="govuk-heading-s govuk-!-margin-bottom-1">Remand</h5>',
    '<table class="govuk-table govuk-body-s govuk-!-margin-bottom-4"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header" scope="col">Date from</th><th class="govuk-table__header" scope="col">Date to</th><th class="govuk-table__header" scope="col">Days</th></tr></thead><tbody class="govuk-table__body">',
    '<tr class="govuk-table__row"><td class="govuk-table__cell">12 Jan 2025</td><td class="govuk-table__cell">22 Feb 2025</td><td class="govuk-table__cell">42</td></tr>',
    '</tbody><tfoot class="govuk-table__foot"><tr class="govuk-table__row"><th class="govuk-table__header" scope="row" colspan="2">Total days</th><td class="govuk-table__cell govuk-!-font-weight-bold">42</td></tr></tfoot></table>',
    '<h5 class="govuk-heading-s govuk-!-margin-bottom-1">Tagged bail</h5>',
    '<table class="govuk-table govuk-body-s govuk-!-margin-bottom-6"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header" scope="col">Court case</th><th class="govuk-table__header" scope="col">From</th><th class="govuk-table__header" scope="col">Days</th></tr></thead><tbody class="govuk-table__body">',
    '<tr class="govuk-table__row"><td class="govuk-table__cell">T20250103</td><td class="govuk-table__cell">14 Mar 2025</td><td class="govuk-table__cell">14</td></tr>',
    '</tbody><tfoot class="govuk-table__foot"><tr class="govuk-table__row"><th class="govuk-table__header" scope="row" colspan="2">Total days</th><td class="govuk-table__cell govuk-!-font-weight-bold">14</td></tr></tfoot></table>',
    '<h4 class="govuk-heading-s govuk-!-margin-bottom-2">Additions</h4>',
    '<h5 class="govuk-heading-s govuk-!-margin-bottom-1">UAL (Unlawfully at large)</h5>',
    '<table class="govuk-table govuk-body-s"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header" scope="col">Date from</th><th class="govuk-table__header" scope="col">Date to</th><th class="govuk-table__header" scope="col">Days</th><th class="govuk-table__header" scope="col">Type</th></tr></thead><tbody class="govuk-table__body">',
    '<tr class="govuk-table__row"><td class="govuk-table__cell">05 Apr 2025</td><td class="govuk-table__cell">18 Apr 2025</td><td class="govuk-table__cell">14</td><td class="govuk-table__cell">Standard</td></tr>',
    '</tbody><tfoot class="govuk-table__foot"><tr class="govuk-table__row"><th class="govuk-table__header" scope="row" colspan="3">Total days</th><td class="govuk-table__cell govuk-!-font-weight-bold">14</td></tr></tfoot></table>'
  ].join('')

  var DATE_LABELS = {
    CRD: 'Conditional release date',
    LED: 'Licence expiry date',
    SED: 'Sentence expiry date',
    HDCED: 'Home detention curfew expiry date',
    TUSED: 'Top-up supervision expiry date',
    PED: 'Parole eligibility date',
    NPD: 'Non-parole date',
    ARD: 'Automatic release date'
  }
  var DATE_KEYS = ['CRD', 'LED', 'SED', 'HDCED', 'TUSED', 'PED', 'NPD', 'ARD']

  function buildDetailHTML (calc, index, total) {
    var changedBlock = ''
    if (calc.hasChange && calc.changed && calc.changed.length) {
      var items = calc.changed.map(function (c) { return '<li>' + escapeHTML(c) + '</li>' }).join('')
      changedBlock = '<div class="govuk-inset-text govuk-!-margin-bottom-4">' +
        '<p class="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-1">What\'s changed</p>' +
        '<ul class="govuk-list govuk-list--bullet">' + items + '</ul>' +
        '</div>'
    }

    var dateCards = DATE_KEYS.map(function (key) {
      var entry = calc.dates[key] || { value: 'N/A', delta: null, direction: null }
      if (entry.value === 'N/A') return ''
      return '<div class="app-stat-card">' +
        '<p class="govuk-heading-s govuk-!-margin-bottom-1">' + key + '</p>' +
        '<p class="app-stat-card__description govuk-hint">' + escapeHTML(DATE_LABELS[key]) + '</p>' +
        '<p class="govuk-body govuk-!-margin-bottom-1">' + escapeHTML(entry.value) + '</p>' +
        '</div>'
    }).join('')

    var adjCards = (calc.adjustments && calc.adjustments.length)
      ? calc.adjustments.map(function (a) { return '<p class="govuk-body-s govuk-!-margin-bottom-0"><strong>' + escapeHTML(a) + '</strong></p>' }).join('')
      : '<p class="govuk-body-s">None</p>'

    return '<h2 class="govuk-heading-l" id="calc-detail-heading">Calculation on ' + escapeHTML(calc.date) + '</h2>' +
      '<div class="govuk-grid-row govuk-!-margin-bottom-2">' +
        '<div class="govuk-grid-column-one-third">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Calculation reason</strong>' + escapeHTML(calc.reason) + '</p>' +
        '</div>' +
        '<div class="govuk-grid-column-one-third">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Establishment</strong>' + escapeHTML(calc.establishment) + '</p>' +
        '</div>' +
        '<div class="govuk-grid-column-one-third">' +
          '<p class="govuk-body govuk-!-margin-bottom-0"><strong class="govuk-!-display-block">Source</strong>' + escapeHTML(calc.source) + '</p>' +
        '</div>' +
      '</div>' +
      changedBlock +
      '<h3 class="govuk-heading-m">Release dates</h3>' +
      '<div class="app-stat-card-grid govuk-!-margin-bottom-4">' + dateCards + '</div>' +
      '<div class="govuk-button-group govuk-!-margin-bottom-6">' +
        '<button type="button" class="govuk-button govuk-button--secondary">Print notification slip</button>' +
        '<button type="button" class="govuk-button govuk-button--secondary">Record a counter check</button>' +
      '</div>' +
      '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">' +
      '<h3 class="govuk-heading-m">Court cases and adjustments</h3>' +
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
      '<details class="govuk-details">' +
        '<summary class="govuk-details__summary">' +
          '<span class="govuk-details__summary-text">View all court case and adjustments information</span>' +
        '</summary>' +
        '<div class="govuk-details__text">' +
          COURT_CASE_DETAIL_HTML +
        '</div>' +
      '</details>'
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
    fetch('/v28/api/calc/' + index)
      .then(function (response) {
        if (!response.ok) throw new Error('Response not OK: ' + response.status)
        return response.json()
      })
      .then(function (calc) {
        if (!calc) throw new Error('No calc data returned')
        var panel = document.getElementById('calc-detail-panel')
        var total = document.querySelectorAll('[data-calc-index]').length +
          (parseInt(document.querySelector('[data-hidden-above]') && document.querySelector('[data-hidden-above]').getAttribute('data-hidden-above'), 10) || 0) +
          (parseInt(document.querySelector('[data-hidden-below]') && document.querySelector('[data-hidden-below]').getAttribute('data-hidden-below'), 10) || 0)

        // Use the total from a data attribute on the panel if available, else derive from DOM
        var totalEl = document.getElementById('calc-total-count')
        var totalCalcs = totalEl ? parseInt(totalEl.getAttribute('data-total'), 10) : document.querySelectorAll('[data-calc-index]').length

        panel.innerHTML = buildDetailHTML(calc, index, totalCalcs)
        history.pushState(null, '', '?selected=' + index)
        updateNavRows(index)
        var heading = document.getElementById('calc-detail-heading')
        if (heading) heading.focus()

        // Update jump select
        var jumpSelect = document.getElementById('jumpSelect')
        if (jumpSelect) jumpSelect.value = String(index)

        // Update nav buttons
        updateNavButtons(index, totalCalcs)
      })
      .catch(function () {
        window.location.href = fallbackUrl
      })
  }

  function updateNavButtons (index, total) {
    // Nothing to update — prev/next buttons are server-rendered.
    // JS navigation for these is handled by their click listeners
    // which re-read the current index from the URL.
    void index
    void total
  }

  function extractSelectedFromHref (href) {
    var match = href && href.match(/[?&]selected=(\d+)/)
    return match ? parseInt(match[1], 10) : null
  }

  document.addEventListener('DOMContentLoaded', function () {
    var panel = document.getElementById('calc-detail-panel')
    if (!panel) return

    // Store total calc count on the panel for JS use
    var jumpSelect = document.getElementById('jumpSelect')
    var totalCalcs = jumpSelect ? jumpSelect.options.length : 0

    var totalEl = document.createElement('span')
    totalEl.id = 'calc-total-count'
    totalEl.setAttribute('data-total', String(totalCalcs))
    totalEl.setAttribute('hidden', '')
    document.body.appendChild(totalEl)

    // Intercept calc row clicks
    document.addEventListener('click', function (e) {
      var row = e.target.closest('[data-calc-index]')
      if (!row) return
      e.preventDefault()
      var index = parseInt(row.getAttribute('data-calc-index'), 10)
      loadCalc(index, row.href)
    })

    // Intercept prev/next change button clicks
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

    // Intercept jump select change
    if (jumpSelect) {
      jumpSelect.addEventListener('change', function (e) {
        var index = parseInt(e.target.value, 10)
        if (isNaN(index)) return
        loadCalc(index, '?selected=' + index)
      })
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function () {
      var params = new URLSearchParams(window.location.search)
      var index = parseInt(params.get('selected') || '0', 10)
      if (isNaN(index)) index = 0
      loadCalc(index, '?selected=' + index)
    })
  })
}())
