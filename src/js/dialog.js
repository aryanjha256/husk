/* husk | dialog.js — Auto-wire dialog open/close via data attributes */

(function (root) {
    'use strict';

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
})(typeof window !== 'undefined' ? window : this);
