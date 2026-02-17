
Feature: Successful Card Payment

  Scenario: Payment triggers analytics reliably
    Given analytics tracking is enabled
    And the checkout page is loaded
    When the customer submits a valid card payment
    Then the analytics event "payment_success" is eventually sent
