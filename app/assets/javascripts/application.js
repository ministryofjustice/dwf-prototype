/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
  window.MOJFrontend.initAll()
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('.enhance-autcomplete')
  })
})


// Check all checkboxes
$('#unselect-all').click(function(event) {   
    if(this.checked) {
        // Iterate each checkbox
        $('.count').each(function() {
            this.checked = false;                        
        });
    } 
}); 

/**
 * Task Management System
 * Handles persisting task completion state across pages using sessionStorage
 */
var TaskManager = (function() {
  var STORAGE_KEY = 'dwfTasks';
  var SEED_STORAGE_KEY = 'dwfTaskSeed';
  var defaultTasks = {
    remandWarrantReviewed: false,
    calculationPerformed: false,
    courtCaseAdded: false
  };

  function getSeedConfig() {
    var seedNode = document.querySelector('[data-task-state-seed]');
    if (!seedNode) {
      return null;
    }

    return {
      seed: seedNode.getAttribute('data-task-state-seed') || '',
      remandWarrantReviewed: seedNode.getAttribute('data-task-remand-viewed') === 'true'
    };
  }

  // Get all tasks from sessionStorage
  function getTasks() {
    var stored = sessionStorage.getItem(STORAGE_KEY);
    var base = Object.assign({}, defaultTasks);
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        return Object.assign(base, parsed);
      } catch (e) {
        return base;
      }
    }
    return base;
  }

  // Save all tasks to sessionStorage
  function saveTasks(tasks) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function syncSeededTaskState() {
    var seedConfig = getSeedConfig();
    if (!seedConfig || !seedConfig.seed) {
      return;
    }

    var currentSeed = sessionStorage.getItem(SEED_STORAGE_KEY);
    if (currentSeed === seedConfig.seed) {
      return;
    }

    saveTasks(Object.assign({}, defaultTasks, {
      remandWarrantReviewed: seedConfig.remandWarrantReviewed
    }));
    sessionStorage.setItem(SEED_STORAGE_KEY, seedConfig.seed);
  }

  // Mark a task as complete
  function completeTask(taskName) {
    var tasks = getTasks();
    tasks[taskName] = true;
    saveTasks(tasks);
    updateUI();
  }

  function getDocumentCount() {
    var documentNav = document.querySelector('[data-task-document-count]');
    if (!documentNav) return 0;

    var count = parseInt(documentNav.getAttribute('data-task-document-count'), 10);
    return isNaN(count) ? 0 : count;
  }

  // Count all pending tasks (remand, calculation only — documents are not tasks)
  function countPendingTasks() {
    var t = getTasks();
    var count = 0;
    // Remand
    if (!t.remandWarrantReviewed) count++;
    // Calculation
    if (t.remandWarrantReviewed && !t.calculationPerformed) count++;
    return count;
  }

  // Update all Things to do headings
  function updateTaskHeadings() {
    var count = countPendingTasks();
    var headings = document.querySelectorAll('[data-task-heading]');
    headings.forEach(function(h) {
      h.textContent = 'Things to do (' + count + ')';
    });
  }

  // Show/hide task panels based on state
  function updateTaskPanels() {
    var t = getTasks();
    // Remand
    var remandPanels = document.querySelectorAll('article.moj-ticket-panel');
    remandPanels.forEach(function(panel) {
      var link = panel.querySelector('a');
      if (link && link.textContent.indexOf('Enter information from a remand warrant') !== -1) {
        panel.style.display = t.remandWarrantReviewed ? 'none' : '';
      }
    });
    // Calculation
    var calcPanels = document.querySelectorAll('#calculation-task-panel');
    calcPanels.forEach(function(panel) {
      panel.style.display = (t.remandWarrantReviewed && !t.calculationPerformed) ? '' : 'none';
    });
  }

  function updateEmptyStates() {
    var emptyStates = document.querySelectorAll('[data-task-empty-state]');
    emptyStates.forEach(function(emptyState) {
      var taskColumn = emptyState.closest('[data-task-column]');
      if (!taskColumn) return;

      var visiblePanels = Array.from(taskColumn.querySelectorAll('[data-task-panel]')).filter(function(panel) {
        return panel.style.display !== 'none';
      });

      emptyState.style.display = visiblePanels.length === 0 ? '' : 'none';
    });
  }

  // Update navigation badges using moj-notification-badge and only on relevant tab
  function updateNavigationBadges() {
    var t = getTasks();
    // Remove all notification badges
    var badges = document.querySelectorAll('.notification-badge, .moj-notification-badge');
    badges.forEach(function(b) { b.remove(); });

    // Court cases badge: only if remand task is outstanding, match exact tab
    var courtNav = Array.from(document.querySelectorAll('a.govuk-service-navigation__link')).find(function(link) {
      return link.getAttribute('href') && link.getAttribute('href').endsWith('/court-cases/');
    });
    if (courtNav && !t.remandWarrantReviewed) {
      var badge = document.createElement('span');
      badge.className = 'moj-notification-badge';
      badge.textContent = '1';
      badge.setAttribute('aria-label', 'Outstanding court case task');
      courtNav.appendChild(badge);
    }

    // Release dates badge: only if calculation task is outstanding, match exact tab
    var releaseNav = Array.from(document.querySelectorAll('a.govuk-service-navigation__link')).find(function(link) {
      return link.getAttribute('href') && link.getAttribute('href').endsWith('/release-dates.html');
    });
    if (releaseNav && t.remandWarrantReviewed && !t.calculationPerformed) {
      var badge = document.createElement('span');
      badge.className = 'moj-notification-badge';
      badge.textContent = '1';
      badge.setAttribute('aria-label', 'Outstanding calculation task');
      releaseNav.appendChild(badge);
    }

    // Documents badge: only if documents outstanding, match exact tab
    var documentsNav = Array.from(document.querySelectorAll('a.govuk-service-navigation__link')).find(function(link) {
      return link.getAttribute('href') && link.getAttribute('href').endsWith('/documents.html');
    });
    var docCount = getDocumentCount();
    if (documentsNav && docCount > 0) {
      var badge = document.createElement('span');
      badge.className = 'notification-badge';
      badge.textContent = docCount;
      badge.setAttribute('aria-label', 'Outstanding document tasks');
      documentsNav.appendChild(badge);
    }
  }

  // Update all UI
  function updateUI() {
    updateTaskPanels();
    updateTaskHeadings();
    updateEmptyStates();
    updateNavigationBadges();
  }

  // On page load, check for completion triggers
  function init() {
    syncSeededTaskState();
    var url = window.location.pathname;
    // Remand completion: only when user reaches the court-case confirmation routes
    if (url.indexOf('/add-a-court-case/confirmation') !== -1 || url.indexOf('/add-a-court-appearance/confirmation') !== -1) {
      completeTask('remandWarrantReviewed');
    }
    // Calculation completion: only when user reaches calculation-complete
    if (url.indexOf('/calculate-release-dates') !== -1 && url.indexOf('calculation-complete') !== -1) {
      completeTask('calculationPerformed');
    }
    updateUI();
  }

  return {
    init: init,
    completeTask: completeTask,
    getTasks: getTasks
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  if (typeof TaskManager !== 'undefined') {
    TaskManager.init();
  }
});

