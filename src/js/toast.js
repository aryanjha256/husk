/* husk | toast.js — Toast notification API */

(function (root) {
    'use strict';

    var Husk = root.Husk || (root.Husk = {});

    /**
     * Show a toast notification.
     * @param {string} message - The text to display
     * @param {Object} [options]
     * @param {string} [options.type] - 'success' | 'danger' | 'warning' | 'info'
     * @param {number} [options.duration=3000] - Auto-dismiss in ms (0 = manual)
     * @returns {HTMLElement} The toast element
     */
    Husk.toast = function (message, options) {
        options = options || {};
        var type = options.type || 'default';
        var duration = options.duration !== undefined ? options.duration : 3000;

        // Ensure toast container exists
        var container = document.getElementById('husk-toasts');
        if (!container) {
            container = document.createElement('div');
            container.id = 'husk-toasts';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'false');
            document.body.appendChild(container);
        }

        // Create toast element
        var toast = document.createElement('div');
        toast.setAttribute('role', 'alert');
        if (type !== 'default') {
            toast.setAttribute('data-type', type);
        }
        toast.textContent = message;
        container.appendChild(toast);

        // Trigger enter animation on next frame
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                toast.classList.add('husk-toast-show');
            });
        });

        // Dismiss function
        function dismiss() {
            toast.classList.remove('husk-toast-show');
            toast.addEventListener('transitionend', function handler() {
                toast.removeEventListener('transitionend', handler);
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            });
        }

        // Click to dismiss
        toast.style.cursor = 'pointer';
        toast.addEventListener('click', dismiss);

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(dismiss, duration);
        }

        toast.dismiss = dismiss;
        return toast;
    };
})(typeof window !== 'undefined' ? window : this);
