Feature: Successful Card Payment

  Scenario: Successful card payment with mocked API
    Given the checkout page is loaded
    When the customer submits a valid card payment
    Then the payment confirmation is displayed
    And the analytics event "payment_success" is sent
