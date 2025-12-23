export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        {/* 顶部标题 */}
        <h1 className="text-4xl font-extrabold mb-2 text-center">Return Policy</h1>
        <p className="text-sm text-gray-500 mb-10 text-center">Last updated: July 25, 2025</p>

        {/* 感谢语 */}
        <p className="mb-6">
          Thank you for shopping with us. Your satisfaction is our top priority. If you have
          any concerns about your order, we ask that you please contact us directly at <strong>support@economicalkshop.com</strong>
          with your order number (e.g., 015SHOP-1218) and order email so we can make things
          right. Please review our full policy carefully below.
        </p>

        {/* General Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">General Policy</h2>
          <p>
            Please note that <strong>all sales are final</strong>. We do not offer returns or
            exchanges, with the sole exception of items that have a verified quality issue or
            if an incorrect product was sent.
          </p>
        </section>

        {/* Damages and Quality Issues */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Damages and Quality Issues</h2>
          <p className="mb-4">
            We stand by the quality of our products. Should you discover that an item is
            defective, damaged, or incorrect upon arrival, please contact our support team
            directly as your first step. We are fully committed to working with you to
            achieve a fair resolution.
          </p>
          <p className="mb-4">
            Please inspect your order upon reception and contact us within{' '}
            <strong>7 days</strong> of delivery.
          </p>
          <p className="mb-2">To ensure a swift resolution, please contact us at
            
              <strong>support@economicalkshop.com</strong>
            
            with the following information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Your order number (e.g., 015SHOP-1218) and the email address used for the purchase.</li>
            <li>A description of the issue.</li>
            <li>Clear photographic or video evidence of the defect, damage, or incorrect item.</li>
          </ul>
          <p className="mt-4">
            Our team will evaluate your claim and determine the appropriate solution.
            Solutions are assessed on a case-by-case basis and may include a replacement, a
            partial refund, or a full refund.
          </p>
        </section>

        {/* Refunds */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Refunds</h2>
          <p>
            If a full or partial refund is the approved solution for your claim, it will be
            credited to your original payment method. You can expect the funds to appear in
            your account within <strong>7-12 business days</strong>. Please note that final
            posting times are subject to the processing speed of your bank or credit card
            company.
          </p>
        </section>

        {/* Exchanges */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Exchanges</h2>
          <p>
            We do not offer exchanges. We only replace items if they are defective or
            damaged upon arrival and a claim has been approved.
          </p>
        </section>

        {/* Unauthorized Returns */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Unauthorized Returns</h2>
          <p>
            Please do not send any items back to us unless you have been instructed to do so
            by our support team. To be eligible for a resolution, you must first contact us
            to initiate a claim.
          </p>
          <p className="mt-4">
            Any item returned without prior notification and an approved claim will not be
            accepted. We will not be able to provide any assistance, including refunds or
            replacements, for unauthorized returns.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
          <p>
            For any questions or concerns, please do not hesitate to contact our support
            team. Reaching out to us directly at
            <strong>support@economicalkshop.com</strong>
            
            with your order number (e.g., 015SHOP-1218) and order email is the fastest and
            most effective way to resolve any issue. We are committed to your satisfaction
            and will always do our best to make things right.
          </p>
        </section>
      </div>
    </div>
  );
}