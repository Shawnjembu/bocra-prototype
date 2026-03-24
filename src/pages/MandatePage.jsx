export default function MandatePage({ setCurrentPage }) {
  const sectors = [
    {
      id: 'telecom',
      color: '#0057A8',
      accent: '#1a6fc4',
      icon: '📡',
      title: 'Telecommunications',
      page: 'telecom',
      description:
        'BOCRA regulates telecommunications under the Communications Regulatory Authority Act 2012, operating within guidelines from the 1995 Telecommunication Policy. This covers radio frequency management, numbering plans, spectrum planning, and equipment type approval.',
      responsibilities: [
        'Radio frequency spectrum planning and management',
        'National numbering plan administration',
        'Licensing of telecom service providers',
        'Equipment type approval',
        'Quality of service monitoring',
        'Consumer complaint investigation',
      ],
    },
    {
      id: 'broadcasting',
      color: '#D4A017',
      accent: '#F5C842',
      icon: '📻',
      title: 'Broadcasting',
      page: 'broadcasting',
      description:
        'BOCRA is mandated by the CRA Act to regulate all broadcasting, subscription management services, and re-broadcasting activities in Botswana, excluding state broadcasting. Licensed broadcasters must comply with content requirements including local artist promotion.',
      responsibilities: [
        'Licensing of commercial radio and television stations',
        'Enforcing local content requirements',
        'Oversight of subscription management services',
        'Monitoring broadcaster compliance',
        'Processing broadcasting licence applications',
        'Regulation of re-broadcasting activities',
      ],
    },
    {
      id: 'postal',
      color: '#8B0000',
      accent: '#a30000',
      icon: '📮',
      title: 'Postal Services',
      page: 'postal',
      description:
        'The CRA Act 2012 established BOCRA\'s mandate to supervise postal services. BOCRA ensures safe, reliable, efficient and affordable postal services throughout Botswana by licensing and overseeing postal operators.',
      responsibilities: [
        'Licensing of public and commercial postal operators',
        'Universal postal service oversight',
        'Ensuring affordable and reliable postal delivery',
        'Courier and value-added service regulation',
        'Interconnection between postal operators',
        'Consumer protection in postal services',
      ],
    },
    {
      id: 'internet',
      color: '#006400',
      accent: '#008000',
      icon: '🌐',
      title: 'Internet & ICTs',
      page: 'internet',
      description:
        'BOCRA regulates internet and ICT services, managing the .bw country code top-level domain, cybersecurity incident response through bwCIRT, and overseeing electronic communications and transactions frameworks.',
      responsibilities: [
        '.bw ccTLD domain management',
        'bwCIRT — cybersecurity incident response',
        'Electronic Communications and Transactions oversight',
        'Electronic Records (Evidence) Act administration',
        'Digital signature service provider accreditation',
        'Internet connectivity standards and guidelines',
      ],
    },
  ];

  const functions = [
    'Process applications for and issue licences, permits, permissions, concessions and authorities for regulated sectors',
    'Investigate and resolve consumer complaints against service providers',
    'Monitor and enforce quality of service standards',
    'Manage the national radio frequency spectrum',
    'Administer the national numbering plan',
    'Promote competition and prevent anti-competitive practices',
    'Facilitate universal access to communications services',
    'Advise the Minister on communications sector matters',
    'Develop and publish regulations, guidelines and determinations',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Our Regulatory Mandate</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA is Botswana's converged regulator, mandated under the Communications Regulatory Authority Act, 2012 to regulate telecommunications, broadcasting, postal services, internet and ICT services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Legal Basis */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Legal Basis</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            BOCRA derives its mandate from the <strong>Communications Regulatory Authority Act, 2012 (CRA Act)</strong>, which established the authority as an independent regulatory body. Under Section 6(h) of the CRA Act, BOCRA is empowered to process applications for and issue licences, permits, permissions, concessions and authorities for regulated sectors. The authority operates as a converged regulator, overseeing four primary sectors under a unified legal framework.
          </p>
        </section>

        {/* Sectors */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Regulated Sectors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sectors.map((s) => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-2" style={{ backgroundColor: s.color }}></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{s.icon}</span>
                    <h3 className="text-xl font-bold" style={{ color: s.color }}>{s.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                  <ul className="space-y-1 mb-4">
                    {s.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }}></span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setCurrentPage(s.page)}
                    className="text-sm font-medium hover:underline"
                    style={{ color: s.color }}
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Functions */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Key Functions</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {functions.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Licensing framework */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Licensing Framework</h2>
          <p className="text-blue-200 mb-6">Implemented in September 2015, the converged ICT licensing framework operates under three categories for telecommunications and broadcasting, plus two for postal services.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: 'NFP', name: 'Network Facilities Provider', desc: 'Entities owning or operating physical infrastructure — fixed links, transmitters, satellites, cables, towers, switches and base stations.' },
              { code: 'SAP', name: 'Services & Applications Provider', desc: 'Non-infrastructure providers delivering specific functions to end users through speech, data, text or images.' },
              { code: 'CSP', name: 'Content Services Provider', desc: 'Providers offering content material in the form of speech, sounds, text, data or images for broadcasting and subscription services.' },
              { code: 'DPO', name: 'Designated Postal Operator', desc: 'Carries universal postal service obligations. Currently held by Botswana Postal Services Limited (15-year licence).' },
              { code: 'CPO', name: 'Commercial Postal Operator', desc: 'Provides courier and value-added postal services. Open applications, 10-year licence term.' },
            ].map((cat) => (
              <div key={cat.code} className="bg-white/10 rounded-lg p-4">
                <span className="text-[#2DD4BF] font-black text-lg">{cat.code}</span>
                <p className="text-white font-semibold mt-1 mb-1">{cat.name}</p>
                <p className="text-blue-200 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
