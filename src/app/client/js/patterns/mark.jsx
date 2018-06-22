
import React from 'react';

export let mark = {

    slug: 'mark',

    name: `Mark`,

    fullName: `PayPal Checkout Mark Integration`,

    intro: (
        <p>Create a <b>PayPal</b> button and accept payments using a mark integration.</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <!-- Render the radio fields and button containers -->

        <label>
            <input type="radio" name="payment-option" value="paypal" checked>
            <img src="${ctx.baseURL}/static/img/paypal-mark.jpg" alt="Pay with Paypal">
        </label>

        <label>
            <input type="radio" name="payment-option" value="card">
            <img src="${ctx.baseURL}/static/img/card-mark.png" alt="Accepting Visa, Mastercard, Discover and American Express">
        </label>

        <div id="paypal-button-container"></div>
        <div id="card-button-container" class="hidden"><button>Continue</button></div>

        <script>

            // Helper functions

            function getElements(el) {
                return Array.prototype.slice.call(document.querySelectorAll(el));
            }

            function hideElement(el) {
                document.body.querySelector(el).style.display = 'none';
            }

            function showElement(el) {
                document.body.querySelector(el).style.display = 'block';
            }

            // Listen for changes to the radio fields

            getElements('input[name=payment-option]').forEach(function(el) {
                el.addEventListener('change', function(event) {

                    // If PayPal is selected, show the PayPal button

                    if (event.target.value === 'paypal') {
                        hideElement('#card-button-container');
                        showElement('#paypal-button-container');
                    }

                    // If Card is selected, show the standard continue button

                    if (event.target.value === 'card') {
                        showElement('#card-button-container');
                        hideElement('#paypal-button-container');
                    }
                });
            });

            // Hide Non-PayPal button by default

            hideElement('#card-button-container');

            // Render the PayPal button

            paypal.Button.render({

                env: '${ctx.env}',

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },

                style: {
                    label: 'pay',
                    size:  'small',
                    shape: 'pill',
                    color: 'gold'
                },

                commit: true,

                payment: function(data, actions) {
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total: '0.01', currency: 'USD' }
                                }
                            ]
                        }
                    });
                },

                onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function() {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
