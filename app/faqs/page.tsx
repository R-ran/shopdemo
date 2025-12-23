export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            FAQs
          </h1>

          {/* FAQ 内容 */}
          <div className="space-y-8 text-left">
            {/* FAQ 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions (FAQ)
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              Welcome to our FAQ page! Here you'll find answers to common questions. If you can't find what you're looking for, please don't hesitate to contact us at<b>support@economicalkshop.com</b> with your<b>Order Number and Order Email</b> so we can help you out!
              </p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Ordering & Payments
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: How do I apply a discount code? </b>To apply your discount code, follow these steps:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              To apply your discount code during checkout using either PayPal or a credit/debit card, please follow the steps below:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              1. Select the product you wish to purchase and click "Add to Cart."
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              2. In your cart, click "PAY WITH DEBIT/CREDIT CARD" to proceed to checkout. (For both PayPal and credit card payments.)
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● On mobile: Tap "Show order summary", then enter your discount code.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● On desktop: Enter your discount code in the field on the right side of the page.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              3. After applying the code, continue with your payment using either PayPal or by entering your credit card details.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: What payment methods do you accept? </b>We accept a wide range of secure payment options:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● PayPal
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Visa, MasterCard, American Express (AE), Diner’s Club
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Most major debit/credit cards
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Apple Pay & Google Pay
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: How much is the shipping fee? </b>Our standard shipping fee is typically USD $5.99 for worldwide delivery. The final rate may vary based on your location and any active promotions. You will always see the exact shipping cost clearly displayed at checkout before completing your purchase.
              </p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Shipping &amp; Delivery
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: Do you offer international shipping? </b>Yes, we ship worldwide! We are an international company with fulfillment centers around the globe. To ensure the fastest delivery, our logistics team will ship your order from the nearest available warehouse based on your location.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: How long does shipping take? </b>Our estimated delivery time is 10–20 business days after your order has been processed and shipped.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: How can I track my order? </b>Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your shipment on a universal tracking site like https://parcelsapp.com/en/
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: Why isn't my tracking information updating? </b>Please allow up to 24-48 hours after receiving your shipping confirmation for the tracking system to reflect new updates. It's normal for a package to go a few days without an update while in transit between carrier hubs.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: I only received part of my order. Why? </b>If your order includes multiple items, they may be dispatched in separate packages from different warehouses to get to you faster. Each package will have its own unique tracking number, which will be sent to your email.
              </p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Order Modifications &amp; Cancellations
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: Can I change my shipping address, name, or phone number? </b>This is extremely time-sensitive. Please contact us immediately at <b>support@economicalkshop.com</b> with the subject line "Urgent: Address Change".
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              In your email, please include:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Number (e.g., 071SHOP-112938)
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Email
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● The complete and correct shipping information
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              We will do our best to update your order if it has not yet been processed. If the order has already shipped, we are unable to make changes, and we recommend contacting the courier directly.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: Can I change the items in my order (e.g., size, color, quantity)? </b>This is also very time-sensitive. Please email us right away at <b>support@economicalkshop.com</b> with the subject line "Urgent: Order Change".
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              In your email, please include:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Number (e.g., 071SHOP-112938)
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Email
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● The specific change you would like to make
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              We can only accommodate your request if your order has not yet reached the fulfillment stage. This window is often very short.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: Can I cancel my order? </b>If your order has not yet been dispatched, we can process a cancellation. Please note that a small handling fee may apply. If your order has already shipped, it cannot be canceled.
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Post-Delivery Issues
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: My order arrived damaged. What should I do? </b>We sincerely apologize. Please email us at <b>support@economicalkshop.com</b> with the following, and we will assist you right away:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Number (e.g., 071SHOP-112938) and Order Email
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Photos or a video showing the damaged item(s)
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● A photo of the shipping label on the package
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: What if I believe my item has a quality issue or defect? </b>We take product quality very seriously and we're sorry that your item didn't meet our standards. Please email us at <b>support@economicalkshop.com</b> so we can make it right. In your email, please provide:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Number (e.g., 071SHOP-112938) and Order Email
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● A clear description of the quality issue
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Photos or a short video that clearly shows the defect
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: I received the wrong item or am missing an item. What should I do? </b>We are very sorry for the error. Please email us at <b>support@economicalkshop.com</b> so we can resolve this for you. Include in your email:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● Your Order Number (e.g., 071SHOP-112938) and Order Email
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              ● A photo or video of the incorrect item received (or a list of the missing items)
              </p>
            </div>

            {/* FAQ 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Account &amp; Communication
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: I didn't receive an order confirmation email. What should I do? </b>First, please check your spam or junk folder. If it's still not there, contact us at <b>support@economicalkshop.com</b> with the email address you believe you used at checkout, and we will find your order and resend the confirmation.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              <b>Q: I haven't received my tracking number yet. What should I do? </b>Tracking numbers are typically sent 1–2 business days after your order is processed. If it has been longer than this, please check your spam folder first, then contact us for an update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

