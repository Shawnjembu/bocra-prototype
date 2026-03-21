export default function ProjectsPage() {
  const projects = [
    {
      id: 'bw-domain',
      title: 'Country Code Top-Level Domain (.bw)',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700',
      icon: '🌐',
      description:
        'BOCRA oversees the government-mandated regulatory and administrative functions for the .bw country code top-level domain (ccTLD). ISPs are permitted to perform retail functions by registering and selling .bw domain names.',
      details: [
        'A Technical Advisory Committee (TAC) was inaugurated on 28 April 2010, comprising representatives from nine stakeholder organisations.',
        'Two sub-committees were established under the TAC: the Policy Sub-Committee and the Public Awareness Sub-Committee.',
        'ISPs are authorised to perform retail domain registration functions for .bw names.',
        'The TAC Action Plan guides the governance and development of the .bw domain namespace.',
      ],
      link: 'https://nic.net.bw',
      linkLabel: 'Visit nic.net.bw for .bw registration',
    },
    {
      id: 'infrastructure-sharing',
      title: 'Infrastructure Sharing',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700',
      icon: '🏗️',
      description:
        'BOCRA, in collaboration with the Department of Environmental Affairs and telecommunications operators, developed guidelines for passive infrastructure sharing aimed at reducing unnecessary duplication of telecommunications infrastructure across Botswana.',
      details: [
        'Minimise or completely avoid unnecessary duplication of passive telecommunications infrastructure.',
        'Protect the environment by reducing the proliferation of towers and physical structures.',
        'Promote fair competition through equal access to shared infrastructure.',
        'Minimise operator capital expenditure on supporting infrastructure such as towers, ducts, and power systems.',
      ],
    },
    {
      id: 'digital-switchover',
      title: 'Digital Switchover Process',
      status: 'Completed',
      statusColor: 'bg-blue-100 text-blue-700',
      icon: '📺',
      description:
        'As required by the ITU Regional Radiocommunications Conference 2006, all countries in the African and European Region were expected to complete the transition from analogue to digital broadcasting by 2015. BOCRA led Botswana\'s Digital Switchover Process.',
      details: [
        'ITU Regional Radiocommunications Conference 2006 mandated digital switchover for all African and European Region countries by 2015.',
        'A Reference Group was established on 7 February 2008 to initiate Botswana\'s digital switchover and migration planning.',
        'The Reference Group coordinated government, broadcasters and technical stakeholders in the transition process.',
        'Digital switchover information was made available to the public through the dedicated godigital.org.bw resource.',
      ],
      link: 'http://www.godigital.org.bw',
      linkLabel: 'Digital Switchover Information',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">BOCRA</p>
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA leads and participates in key communications sector projects that shape the development of Botswana's digital infrastructure and regulatory landscape.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-[#002B7F]">{p.title}</h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${p.statusColor}`}>{p.status}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-medium text-[#002B7F] hover:underline"
                  >
                    {p.linkLabel} →
                  </a>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Key Details</h3>
                <ul className="space-y-2">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2DD4BF] flex-shrink-0"></span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
