/*! husk v0.1.0 | MIT License */
(function(){
"use strict";

// --- js/toast.js ---
/* husk | toast.js — Toast notification API */

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

// --- js/dialog.js ---
/* husk | dialog.js — Auto-wire dialog open/close via data attributes */

var Husk = root.Husk || (root.Husk = {});

    Husk.dialog = {
        /**
         * Initialize dialog wiring. Call once on DOMContentLoaded or after dynamic content.
         * Connects [data-open="dialog-id"] buttons to dialog.showModal()
         * and [data-close] buttons inside dialogs to dialog.close()
         */
        init: function () {
            // Open triggers: <button data-open="dialog-id">
            document.addEventListener('click', function (e) {
                var trigger = e.target.closest('[data-open]');
                if (trigger) {
                    var id = trigger.getAttribute('data-open');
                    var dialog = document.getElementById(id);
                    if (dialog && typeof dialog.showModal === 'function') {
                        dialog.showModal();
                    }
                }
            });

            // Close triggers: <button data-close> inside a <dialog>
            document.addEventListener('click', function (e) {
                var closer = e.target.closest('[data-close]');
                if (closer) {
                    var dialog = closer.closest('dialog');
                    if (dialog && typeof dialog.close === 'function') {
                        dialog.close(closer.value || '');
                    }
                }
            });

            // Click backdrop to close (click on dialog element itself, not its contents)
            document.addEventListener('click', function (e) {
                if (e.target.tagName === 'DIALOG' && e.target.open) {
                    var rect = e.target.getBoundingClientRect();
                    var isInDialog =
                        e.clientX >= rect.left &&
                        e.clientX <= rect.right &&
                        e.clientY >= rect.top &&
                        e.clientY <= rect.bottom;
                    if (!isInDialog) {
                        e.target.close();
                    }
                }
            });
        }
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Husk.dialog.init);
    } else {
        Husk.dialog.init();
    }

})()
