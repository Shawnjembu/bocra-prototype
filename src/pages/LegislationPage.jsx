export default function LegislationPage() {
  const primaryLegislation = [
    {
      title: 'Communications Regulatory Authority Act, 2012 (CRA Act)',
      year: '2012',
      status: 'In Force',
      summary:
        'The principal legislation establishing BOCRA as an independent regulatory authority, effective 1 April 2013. Grants the mandate to regulate telecommunications, ICTs, radio communications, broadcasting, postal services and related matters. Under Section 6(h), BOCRA is empowered to process applications for and issue licences, permits, permissions, concessions and authorities for regulated sectors.',
      keyProvisions: [
        'Establishes BOCRA as an independent converged regulator',
        'Mandates regulation of telecommunications, broadcasting, postal and internet services',
        'Empowers BOCRA to issue and manage licences across all regulated sectors',
        'Provides for the appointment of the Board and Chief Executive',
        'Sets out consumer protection obligations for service providers',
        'Establishes the Universal Access and Service Fund (UASF)',
      ],
    },
    {
      title: 'Electronic Records (Evidence) Act No. 13 of 2014',
      year: '2014',
      status: 'In Force',
      summary:
        'Addresses the admissibility of electronic evidence in court proceedings in Botswana. Requires the establishment of approved processes for electronic document production and mandates certification of electronic records systems to ensure integrity. BOCRA administers aspects of this Act relating to communications systems.',
      keyProvisions: [
        'Establishes legal admissibility of electronic records as evidence',
        'Requires approved processes for electronic document production',
        'Mandates certification of electronic records systems for integrity',
        'Sets standards for electronic records management',
        'Provides for the appointment of certifying authorities',
      ],
    },
    {
      title: 'Electronic Communications and Transactions Act, 2014',
      year: '2014',
      status: 'In Force',
      summary:
        'Empowers BOCRA to accredit secure digital signature service providers and grants authority over the administration of takedown notices. Provides legal equivalence between electronic signatures and handwritten signatures in court proceedings, enabling the digital economy.',
      keyProvisions: [
        'Grants legal equivalence to electronic signatures',
        'Empowers BOCRA to accredit digital signature service providers',
        'Provides authority over takedown notice administration',
        'Establishes framework for electronic contracts and transactions',
        'Supports the development of Botswana\'s digital economy',
      ],
    },
  ];

  const regulatoryFrameworks = [
    {
      title: 'Converged ICT Licensing Framework',
      year: '2015',
      description: 'Implemented in September 2015, this framework introduced the Network Facilities Provider (NFP) and Services and Applications Provider (SAP) licence categories, replacing the previous sector-specific licensing approach.',
    },
    {
      title: 'Postal Sector Licensing Framework',
      description: 'Establishes two licence categories for postal services: the Designated Public Postal Operator Licence (15 years, universal service obligations) and the Commercial Postal Operator Licence (10 years, courier services).',
    },
    {
      title: 'Universal Access and Service Fund (UASF)',
      description: 'BOCRA serves as Fund Manager under a memorandum of agreement. The UASF supports the extension of communications services to underserved communities across Botswana.',
    },
    {
      title: 'Internet Connectivity Guidelines',
      description: 'BOCRA\'s Guidelines on Minimum Requirements for Internet Connectivity in Hospitality Facilities establish minimum standards for service quality and bandwidth requirements.',
    },
    {
      title: 'National Radio Frequency Plan',
      description: 'The National Radio Frequency Plan governs the allocation and use of the radio frequency spectrum in Botswana, managed by BOCRA to ensure efficient and interference-free use.',
    },
    {
      title: '1995 Telecommunication Policy',
      year: '1995',
      description: 'The foundational policy document that established the framework for telecommunications regulation in Botswana, within whose guidelines BOCRA continues to operate the telecommunications sector.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Legislation & Regulatory Framework</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA operates under a comprehensive legislative framework that governs the regulation of communications services in Botswana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Primary Legislation */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Primary Legislation</h2>
          <div className="space-y-6">
            {primaryLegislation.map((law) => (
              <div key={law.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {law.year && (
                        <span className="text-xs font-semibold bg-[#002B7F] text-white px-2 py-0.5 rounded">{law.year}</span>
                      )}
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded">{law.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#002B7F] mt-2">{law.title}</h3>
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{law.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Provisions</h4>
                    <ul className="space-y-1.5">
                      {law.keyProvisions.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2DD4BF] flex-shrink-0"></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory Frameworks */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Regulatory Frameworks & Policies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regulatoryFrameworks.map((f) => (
              <div key={f.title} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#2DD4BF]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#002B7F] text-sm">{f.title}</h3>
                  {f.year && <span className="text-xs text-gray-400">{f.year}</span>}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download notice */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Documents & Publications</h2>
          <p className="text-blue-200 mb-4">
            Full texts of legislation, regulatory frameworks, guidelines, and draft documents are available for download on the official BOCRA document repository.
          </p>
          <a
            href="https://www.bocra.org.bw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
          >
            Visit BOCRA Document Repository →
          </a>
        </section>

      </div>
    </div>
  );
}
