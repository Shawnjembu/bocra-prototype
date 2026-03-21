export default function AboutPage() {
  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in regulatory service delivery, setting the highest standards in everything we do.',
    },
    {
      title: 'Proactiveness',
      description: 'We anticipate and adapt to emerging industry trends, staying ahead of developments in the communications sector.',
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency and accountability, building trust with all our stakeholders.',
    },
    {
      title: 'People-Centred',
      description: 'We put people at the heart of our work, fostering a culture of development and collaboration.',
    },
  ];

  const pillars = [
    { number: '01', title: 'Competition', description: 'Promoting fair competition among service providers to drive innovation and better consumer outcomes.' },
    { number: '02', title: 'Universal Access & Service', description: 'Ensuring all Batswana have access to affordable and quality communications services.' },
    { number: '03', title: 'Consumer Protection', description: 'Safeguarding the rights and interests of consumers in the communications sector.' },
    { number: '04', title: 'Resource Optimisation', description: 'Efficiently managing the use of communications resources including spectrum and numbering.' },
    { number: '05', title: 'Talent Management', description: 'Attracting, developing and retaining skilled professionals to deliver on our mandate.' },
    { number: '06', title: 'Stakeholder Engagement', description: 'Building strong relationships with industry, government and the public through open dialogue.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">About BOCRA</p>
          <h1 className="text-4xl font-bold mb-4">Botswana Communications Regulatory Authority</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            Established on 1 April 2013 under the Communications Regulatory Authority Act, 2012, BOCRA is Botswana's converged regulator for telecommunications, broadcasting, postal services, internet and ICTs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* Profile */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Organisation Profile</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Botswana Communications Regulatory Authority (BOCRA) was established on <strong>1 April 2013</strong> under the <strong>Communications Regulatory Authority Act, 2012</strong>. The authority was created to manage the regulation of telecommunications, broadcasting, postal services, and internet/ICT services in Botswana under a single converged regulatory framework.
              </p>
              <p>
                BOCRA replaced three previous regulatory bodies, bringing together oversight of the communications sector into one integrated, independent authority. It is mandated to promote competition, innovation, consumer protection and universal access across all regulated sectors.
              </p>
              <p>
                The authority is headquartered at Plot 50671, Independence Avenue, Gaborone and operates across five departments: Compliance and Monitoring, Corporate Support, Business Development, Technical Services, and Corporate Communications and Relations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#002B7F] text-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                <p className="text-blue-100 italic">
                  "Regulate the Communications sector for the promotion of competition, innovation, consumer protection and universal access."
                </p>
              </div>
              <div className="bg-[#2DD4BF] text-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-teal-50 italic">
                  "A connected and Digitally Driven Society."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#002B7F]">
                <h3 className="text-lg font-bold text-[#002B7F] mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Pillars */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-2">Strategic Focus Areas</h2>
          <p className="text-gray-500 mb-6">BOCRA's work is guided by six key strategic pillars.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.number} className="bg-white rounded-xl shadow-sm p-6 flex gap-4">
                <span className="text-3xl font-black text-[#2DD4BF] leading-none">{p.number}</span>
                <div>
                  <h3 className="font-bold text-[#002B7F] mb-1">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">History</h2>
          <div className="relative border-l-4 border-[#2DD4BF] pl-8 space-y-8">
            {[
              { year: '1995', event: 'Botswana\'s Telecommunication Policy established, setting the foundation for sector regulation.' },
              { year: '2012', event: 'The Communications Regulatory Authority Act, 2012 passed by Parliament, creating the legal basis for a converged regulatory authority.' },
              { year: '2013', event: 'BOCRA officially established on 1 April 2013, replacing three previous regulatory frameworks and becoming Botswana\'s single converged regulator for telecommunications, broadcasting, postal and internet services.' },
              { year: '2014', event: 'Electronic Records (Evidence) Act No. 13 of 2014 and the Electronic Communications and Transactions Act 2014 enacted, expanding BOCRA\'s digital regulatory mandate.' },
              { year: '2015', event: 'New converged ICT licensing framework implemented in September, introducing the Network Facilities Provider (NFP) and Services and Applications Provider (SAP) licence categories.' },
            ].map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-11 w-6 h-6 rounded-full bg-[#002B7F] border-4 border-white shadow"></div>
                <span className="text-[#002B7F] font-bold text-lg">{item.year}</span>
                <p className="text-gray-600 mt-1 leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-blue-100">
            <div>
              <p className="font-semibold text-white mb-1">Physical Address</p>
              <p>Plot 50671, Independence Avenue</p>
              <p>Gaborone, Botswana</p>
              <p className="mt-1">P/Bag 00495, Gaborone</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Phone & Fax</p>
              <p>Tel: +267 395 7755</p>
              <p>Fax: +267 395 7976</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Email & Hours</p>
              <p>info@bocra.org.bw</p>
              <p className="mt-1">Monday – Friday</p>
              <p>7:30 AM – 4:30 PM</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
