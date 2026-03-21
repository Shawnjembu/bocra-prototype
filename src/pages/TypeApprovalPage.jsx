export default function TypeApprovalPage() {
  const purposes = [
    {
      title: 'Standards Compliance',
      icon: '✅',
      description:
        'Ensures all radio communication and telecommunication equipment meets international standards applicable to ITU Region 1 members before being sold or used in Botswana.',
    },
    {
      title: 'Consumer Protection',
      icon: '🛡️',
      description:
        'Ensures equipment does not pose health and safety hazards to consumers and is compatible with local telecommunications networks.',
    },
    {
      title: 'Spectrum Management',
      icon: '📡',
      description:
        'Ensures operating frequencies conform to Botswana\'s National Radio Frequency Allocation Plan, preventing harmful interference to essential services.',
    },
  ];

  const licenceTypes = [
    'Aircraft Radio Equipment',
    'Amateur Radio Equipment',
    'Broadcasting Equipment',
    'Cellular / Mobile Equipment',
    'Citizen Band Radio Equipment',
    'Point-to-Multipoint Equipment',
    'Point-to-Point Equipment',
    'Private Radio Communication Equipment',
    'Radio Dealer Equipment',
    'Satellite Service Equipment',
    'Value Added Network Services (VANS) Equipment',
  ];

  const steps = [
    { step: '01', title: 'Prepare Documentation', desc: 'Gather technical specifications, test reports, manufacturer information and equipment samples as required.' },
    { step: '02', title: 'Submit Application', desc: 'Submit your type approval application through the BOCRA Type Approval portal at typeapproval.bocra.org.bw.' },
    { step: '03', title: 'Technical Review', desc: 'BOCRA\'s Technical Services department reviews the application against applicable standards and spectrum requirements.' },
    { step: '04', title: 'Approval & Certification', desc: 'Upon successful review, type approval is granted and the equipment is listed in BOCRA\'s approved equipment database.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Equipment Type Approval</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA is mandated under Section 84 of the CRA Act to type approve all communications equipment that may be connected, used or operated in Botswana for broadcasting or telecommunications services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Legal Mandate */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Legal Mandate</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            Under <strong>Section 84 of the Communications Regulatory Authority Act (CRA Act)</strong>, BOCRA is mandated to type approve all communications equipment that may be connected, used or operated in Botswana for broadcasting or telecommunications services.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            No substandard equipment which may represent health and safety hazards to consumers may be used in Botswana. Vendors importing or selling radio equipment must first obtain BOCRA type approval for each equipment model.
          </p>
        </section>

        {/* Purposes */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Purposes of Type Approval</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {purposes.map((p) => (
              <div key={p.title} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#002B7F]">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-[#002B7F] mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Application Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-start">
                <span className="text-4xl font-black text-[#2DD4BF] leading-none mb-2">{s.step}</span>
                <h3 className="font-bold text-[#002B7F] mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <a
              href="https://typeapproval.bocra.org.bw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 bg-[#002B7F] text-white font-semibold rounded-lg hover:bg-[#1a4a9e] transition-colors text-sm"
            >
              Go to Type Approval Portal →
            </a>
          </div>
        </section>

        {/* Equipment Categories */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#002B7F] mb-4">Equipment Categories Requiring Approval</h2>
            <ul className="space-y-2">
              {licenceTypes.map((lt) => (
                <li key={lt} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002B7F] flex-shrink-0"></span>
                  {lt}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div className="bg-[#002B7F] text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Type Approval Portal</h3>
              <p className="text-blue-200 text-sm mb-3">Search the BOCRA approved equipment database or submit a new type approval application.</p>
              <a
                href="https://typeapproval.bocra.org.bw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
              >
                typeapproval.bocra.org.bw →
              </a>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-[#002B7F] mb-2">Contact Technical Services</h3>
              <p className="text-gray-600 text-sm mb-3">For type approval enquiries, contact BOCRA's Technical Services department.</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>📞 +267 395 7755</p>
                <p>✉️ info@bocra.org.bw</p>
                <p>📍 Plot 50671, Independence Avenue, Gaborone</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
