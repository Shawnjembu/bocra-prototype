export default function InternetPage({ setCurrentPage }) {
  const services = [
    {
      title: '.bw Country Code Top-Level Domain (ccTLD)',
      icon: '🌐',
      description:
        'BOCRA manages the .bw country code top-level domain (ccTLD), which is Botswana\'s official internet domain. Domain registration services are provided through nic.net.bw.',
      link: 'https://nic.net.bw',
      linkLabel: 'Visit nic.net.bw',
    },
    {
      title: 'bwCIRT — Computer Incident Response Team',
      icon: '🛡️',
      description:
        'The Botswana Computer Incident Response Team (bwCIRT) provides cybersecurity incident response services for Botswana. bwCIRT monitors threats, issues alerts and advisories, and supports citizens, businesses and government in responding to cyber incidents.',
      action: 'bwcirt',
      linkLabel: 'Go to bwCIRT Portal',
    },
    {
      title: 'Electronic Communications & Transactions',
      icon: '📝',
      description:
        'BOCRA administers the Electronic Communications and Transactions Act 2014, which grants legal equivalence to electronic signatures, empowers BOCRA to accredit digital signature service providers, and governs takedown notice administration.',
    },
    {
      title: 'Electronic Records (Evidence)',
      icon: '📋',
      description:
        'Under the Electronic Records (Evidence) Act No. 13 of 2014, BOCRA oversees the admissibility of electronic records as evidence in court proceedings, including the certification of electronic records systems for integrity.',
    },
  ];

  const connectivityStats = [
    { label: 'Wholesale Bandwidth Trend', value: 'Declining', note: 'Influenced by EASSy and WACS undersea cable capacity' },
    { label: 'Mobile Internet Growth', value: 'Rising', note: 'Especially among youth due to smartphone adoption' },
    { label: 'ccTLD', value: '.bw', note: 'Managed by BOCRA via nic.net.bw' },
    { label: 'Cybersecurity Body', value: 'bwCIRT', note: 'Computer incident response for all sectors' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-green-200 font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Internet & ICTs</h1>
          <p className="text-green-100 max-w-2xl text-lg">
            BOCRA regulates internet and ICT services in Botswana as a converged regulator, managing domain services, cybersecurity, and the digital legal framework.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Overview */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Regulatory Overview</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            BOCRA regulates internet and ICT services under the <strong>Communications Regulatory Authority Act 2012</strong>, serving as a converged regulator overseeing broadcasting, internet, postal and telecommunications services. The authority facilitates internet market growth and ICT adoption across Botswana.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Wholesale internet bandwidth prices in Botswana have been declining in line with international trends, influenced by capacity acquired through undersea cable systems — notably the <strong>EASSy</strong> (Eastern Africa Submarine System) and <strong>WACS</strong> (West Africa Cable System) — improving affordability and access.
          </p>
        </section>

        {/* Key Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {connectivityStats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 text-center">
              <p className="text-2xl font-black text-[#002B7F]">{s.value}</p>
              <p className="font-semibold text-gray-700 text-sm mt-1">{s.label}</p>
              <p className="text-gray-400 text-xs mt-1">{s.note}</p>
            </div>
          ))}
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Internet & ICT Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="font-bold text-[#002B7F]">{s.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#002B7F] hover:underline"
                  >
                    {s.linkLabel} →
                  </a>
                )}
                {s.action && (
                  <button
                    onClick={() => setCurrentPage(s.action)}
                    className="text-sm font-medium text-[#002B7F] hover:underline"
                  >
                    {s.linkLabel} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Connectivity Guidelines */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Internet Connectivity Guidelines</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            BOCRA has issued <strong>Guidelines on Minimum Requirements for Internet Connectivity in Hospitality Facilities</strong>, establishing minimum standards for service quality and bandwidth requirements for both hospitality providers and their internet service providers.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            The increased number of people with access to mobile internet — especially among Botswana's youth — is driven by growing smartphone adoption and the declining cost of mobile data, in line with BOCRA's universal access mandate.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-[#006400] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Report a Cybersecurity Incident</h2>
          <p className="text-blue-200 mb-4 leading-relaxed">
            If you've experienced a cybersecurity incident — ransomware, phishing, data breach, or other attack — contact bwCIRT for assistance.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage('bwcirt')}
              className="px-5 py-2.5 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
            >
              Go to bwCIRT Portal
            </button>
            <a
              href="mailto:info@bocra.org.bw"
              className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              Email: info@bocra.org.bw
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
