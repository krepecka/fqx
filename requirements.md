readable
scalable
maintainable code, one would call production-ready
"tasty" UX and UI

Create:

- A responsive form where you can fill up all the fields required.
- A "visualization", which would give a quick glance of what user has entered (feel free to improvize)

The business background:

We enable a corporation to define a corporate finance eNote deal. It first inserts the financing amount (=the amount of money needed) and the payment date (=the date when the investor should pay the money). Then, in the following, the corporation defines the eNote Due Date (=the date when the corporation has to pay the money back), the difference is the maturity.

Because the investor wants to make a certain profit, the eNote Face Value (=the amount of money the corporation has to pay back) must be a bit higher than the purchase price. The difference is the Agio.

To help to calculate the eNote Face Value, you can insert either the Agio %, the Agio CHF or the APR % (=the annual interest rate).
Then the other fields including the Face Value are automatically filled out. Of course, you can also directly insert the Face Value (then the other 3 fields are calculated).

Open questions:

- currency
- rounding
- leap years

Fields:

- maturity (days) = dueDate - paymentDate **disabled**

- agioValue (currency, $) = faceValue - purchasePrice
- agioPercentage (%) = (faceValue - purchasePrice) / purchasePrice \* 100
- aprPercentage = (faceValue - purchasePrice) / maturity / 100 \* 365

- faceValue:
  - by agioValue:
    - faceValue = agioValue + purchasePrice
    - 10 100 = 100 + 10 000
  - by agioPercentage:
    - faceValue = (agioPercentage / 100 \* purchasePrice) + purchasePrice
    - 10 100 = ( 1 / 100 \* 10 000 ) + 10 000
  - by aprPercentage:
    - faceValue = ( aprPercentage / 365 \* 100 \* maturity ) + purchasePrice
    - 10 100 = ( 16.59 / 365 \* 100 \* 22 ) + 10 000
  - insert directly:
    - agioValue
    - agioPercentage
    - aprPercentage

Validations:

- dueDate >= paymentDate
- faceValue > purchasePrice

There should be 8 fields that are used for calculations:

- purchasePrice
- paymentDate
- dueDate
- maturity

- agioPercentage
- agioValue
- aprPercentage
- faceValue

Visualization ?
