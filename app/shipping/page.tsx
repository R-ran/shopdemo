export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Our Shipping Policy
          </h1>
          <p className="text-center text-base md:text-lg text-gray-600 mb-8">
            Last Updated: July 25, 2025
          </p>

          {/* 正文内容 */}
          <div className="space-y-6 text-left">
            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              Hey there! Thanks for your order. We know you're excited to receive your items, so here's a little guide on how our shipping works and when you can expect your goodies.
            </p>

            {/* Section 1 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                1. Getting Your Order Ready
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Our team gets to work on your order right away! It usually takes us about <b>3 business days</b> to double-check, pack, and hand off your package to our shipping partners.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Just a heads-up, orders placed on a weekend will be sent out on the following Monday.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                2. Shipping Your Way
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Once it's on its way, your package will typically arrive in <b>10-20 business days</b>. We offer a simple flat-rate shipping fee of <b>$5.99 USD</b> to anywhere in the world.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                3. A Quick Note on Delays
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Sometimes, things outside of our control (like customs checks or carrier hiccups) can cause delays. We thank you so much for your patience if this happens!
              </p>
            </div>

            {/* Section 4 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                4. Tracking Your Package
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                You can follow your package's journey to you! We'll send you a <b>Shipping Confirmation email</b> with a tracking number as soon as your order ships. You can use that number to see where your package is at:
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                <b>www.17track.net</b>
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed italic">
                (P.S. It can take a few days for the tracking to go live, so don't worry if you don't see it right away!)
              </p>
            </div>

            {/* Section 5 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                5. Why did I only receive part of my order?
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Don't worry, the rest of your order is on its way! If your order includes multiple items, we sometimes ship them in separate packages from our different warehouses. We do this to get each item to you as fast as possible.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                You will receive a separate shipping confirmation email, including a unique tracking number, for each package.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                6. Need to Make a Change to Your Order?
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                This is extremely time-sensitive! Whether you need to correct your <b>shipping information</b> (like an address or phone number) or change an <b>item</b> (like its size, color, or quantity), you must contact us ASAP, ideally within <b>12 hours</b> of placing your order.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                Please email our support team with the following:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-base md:text-lg text-gray-900 leading-relaxed">
                <li>Your <b>Order Number</b> (e.g., 071SHOP-123331) and Order Email</li>
                <li>A clear description of the change needed (e.g., the new address, or the new item size/color).</li>
              </ul>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                Our team moves quickly, so we cannot guarantee any changes once an order is being processed for shipment, but we will always do our best to help!
              </p>
            </div>

            {/* Section 7 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                7. If a Delivery is Missed
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                If the delivery driver misses you, they'll usually leave a note and keep your package safe at the local post office. The best first step is to contact your <b>local delivery provider</b> with your tracking number to see what's up. If you're still stuck, just let us know and we'll help out!
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed italic">
                (Please note, we can't be responsible for packages that are returned because of a wrong address or failure to collect.)
              </p>
            </div>

            {/* Section 8 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                8. What To Do If Shipping Takes A While
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                If your package seems to be taking longer than expected, here's a simple 2-step guide to check on it:
              </p>
              <ol className="list-decimal pl-6 mt-3 space-y-2 text-base md:text-lg text-gray-900 leading-relaxed">
                <li>
                  <b>Check Your Tracking:</b> Look at the date of the very last update. Is it within the last 7 days? If yes, great! Your package is still moving along normally.
                </li>
                <li>
                  <b>Know When to Contact Us:</b> If it has been more than 7 days with zero new updates, that's the perfect time to ask for our help. Just send an email to our support team with your <b>order number</b> (e.g., 071SHOP-1128) and <b>order email</b>, and we'll take it from there.
                </li>
              </ol>
            </div>

            {/* Section 9 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                9. Lost or Stolen Packages
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                We know how frustrating it is to think your package is lost. When you contact us about a potential issue, we will work directly with the shipping company to find out exactly where it is.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                <b>Lost in Transit:</b> If our investigation confirms that your package is officially lost during its journey, we will happily send you a replacement order, completely on us.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                <b>A Quick Note on "Delivered" Packages:</b> Our policy doesn't cover packages that are lost or stolen after the tracking confirms a successful delivery to your address. If your tracking says "Delivered" but you can't find it, we recommend checking with your neighbors, family members, or building management first.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                10. Where We Ship From &amp; To
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                <b>Destinations:</b> We ship all over the world! In the very rare case we can't ship to your country, we'll contact you immediately.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mt-3">
                <b>Origin:</b> We have main facilities in the United States, Canada, Australia, and the EU. To get you the best products and prices, we also partner with top-tier manufacturers and may ship your order directly from their facilities!
              </p>
            </div>

            {/* Section 11 - Disclaimer */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                11. Disclaimer
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Just a few final, important notes. By placing an order with us, you agree to the following terms:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-base md:text-lg text-gray-900 leading-relaxed">
                <li>
                  <b>Shipping Times:</b> All shipping timeframes are estimates, not guarantees. We are not responsible for delays caused by customs, carriers, or other factors outside of our control.
                </li>
                <li>
                  <b>Customs, Duties, and Taxes:</b> You, the buyer, are responsible for any customs fees, import duties, taxes, or other charges that may be applied by your country's authorities. These fees are not included in the item price or shipping cost.
                </li>
                <li>
                  <b>Address Accuracy:</b> You are responsible for providing a complete and accurate shipping address. We are not liable for packages lost or returned due to an incorrect address.
                </li>
                <li>
                  <b>Delivered Packages:</b> Our responsibility for an order ends once the tracking status shows a successful delivery. We are not liable for packages that are lost or stolen after this point.
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="mt-16 pt-8 border-t border-gray-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                Have Questions? Contact Us!
              </h2>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed text-center">
                For any of the reasons above, or for any other questions, we're here to help! Reach out to our team at:
              </p>
              <p className="text-lg md:text-xl text-gray-900 font-bold text-center mt-4">
                support@economicalkshop.com
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed text-center mt-4">
                To help us find your order super fast, please always include your <b>Order Number</b> (e.g., 031SHOP-1938) and the <b>Email Address</b> you used to place your order in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
