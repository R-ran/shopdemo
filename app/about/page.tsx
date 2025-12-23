export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            About Us
          </h1>

          {/* 正文内容 */}
          <div className="space-y-6 text-left">
            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              We are dedicated to providing top-rated, versatile and innovative e-commerce products 
              developed with latest technology and manufacturing standards.
            </p>

            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              Has worked to create a superior shopping experience for our customers by developing 
              inventive and useful products.
            </p>

            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              Our commitment to quality, integrity and customer satisfaction, combined with our 
              unmatched expertise, makes us the ideal choice for your needs.
            </p>

            {/* 公司信息 */}
            <div className="mt-8 space-y-2 text-base md:text-lg text-gray-900">
              <p>Email Address: support@economicalkshop.com</p>
              <p>Company name: economicalkmart</p>
              <p>Date of Establishment: July 2018.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

