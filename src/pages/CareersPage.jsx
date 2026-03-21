export default function CareersPage() {
  const benefits = [
    { icon: '🏖️', title: '25 Days Annual Leave', description: 'Generous annual leave allowance to support work-life balance.' },
    { icon: '🏥', title: 'Private Medical Insurance', description: 'Comprehensive private medical cover for you and eligible dependants.' },
    { icon: '🛡️', title: 'Life Assurance', description: 'Life assurance coverage to protect your family\'s financial security.' },
    { icon: '💼', title: 'Pension Allowance', description: 'Pension contributions to support your long-term financial wellbeing.' },
    { icon: '🎓', title: 'Professional Development', description: 'Internal and external training, professional qualification sponsorships and academic funding.' },
    { icon: '✈️', title: 'Flexible Benefits', description: 'Optional flexible benefits including additional leave, travel insurance and family medical coverage.' },
  ];

  const development = [
    {
      title: 'Internal Training Courses',
      description: 'A structured range of internal courses designed to build skills relevant to BOCRA\'s regulatory functions and operations.',
    },
    {
      title: 'External Course Funding',
      description: 'BOCRA funds attendance at external courses and industry events to ensure staff stay current with developments in communications regulation.',
    },
    {
      title: 'Professional & Academic Qualifications',
      description: 'Sponsorship for professional qualifications and academic programmes to support career growth and expertise development.',
    },
    {
      title: 'Professional Body Memberships',
      description: 'Support for membership of relevant professional bodies, enabling staff to engage with the broader professional community.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">About BOCRA</p>
          <h1 className="text-4xl font-bold mb-4">Careers at BOCRA</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            Join an organisation where talented people work together, thrive and develop. BOCRA is committed to investing in its people and creating an environment where excellence flourishes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Why BOCRA */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Why Work at BOCRA?</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            BOCRA is Botswana's converged communications regulatory authority — a dynamic, open and transparent organisation built on competent, motivated staff. We are committed to being an organisation in which talented people work together, thrive and develop.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            We invest significantly in our people through training, professional development and a comprehensive benefits package. Whether you are early in your career or an experienced professional, BOCRA offers the opportunity to make a meaningful impact on Botswana's communications sector.
          </p>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Employee Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-[#002B7F] mb-1">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Development */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Professional Development</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {development.map((d) => (
              <div key={d.title} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#2DD4BF]">
                <h3 className="font-bold text-[#002B7F] mb-2">{d.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Vacancies */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Current Vacancies</h2>
          <div className="text-center py-8 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="font-medium text-gray-500">No vacancies currently advertised.</p>
            <p className="text-sm mt-2">Check back regularly or contact us to register your interest.</p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
          <p className="text-blue-200 mb-4">
            For enquiries about careers and recruitment at BOCRA, contact us at:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-blue-100 text-sm">
            <div>
              <p className="font-semibold text-white">Address</p>
              <p>Plot No. 50671, Independence Avenue</p>
              <p>P/Bag 00495, Gaborone, Botswana</p>
            </div>
            <div>
              <p className="font-semibold text-white">Phone</p>
              <p>+267 395 7755</p>
            </div>
            <div>
              <p className="font-semibold text-white">Email</p>
              <a href="mailto:info@bocra.org.bw" className="text-[#2DD4BF] hover:underline">info@bocra.org.bw</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
