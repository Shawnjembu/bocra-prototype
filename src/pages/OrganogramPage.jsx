export default function OrganogramPage() {
  const departments = [
    {
      name: 'Compliance and Monitoring',
      color: '#002B7F',
      icon: '✅',
      description: 'Responsible for monitoring compliance of licensed operators and service providers with regulatory obligations, licence conditions, and quality of service standards.',
      functions: [
        'Quality of Service monitoring',
        'Licence condition compliance checks',
        'Consumer complaint investigation',
        'Enforcement and sanctions',
        'Market surveillance',
      ],
    },
    {
      name: 'Corporate Support',
      color: '#059669',
      icon: '🏢',
      description: 'Provides essential corporate services including finance, human resources, legal services and administrative support to enable BOCRA to deliver on its mandate.',
      functions: [
        'Financial management and reporting',
        'Human resources and payroll',
        'Legal services and advisory',
        'Procurement and supply chain',
        'Administrative support',
      ],
    },
    {
      name: 'Business Development',
      color: '#D97706',
      icon: '📈',
      description: 'Leads on policy development, regulatory research, licensing and the facilitation of new entrants into the communications market.',
      functions: [
        'Licensing administration',
        'Policy research and development',
        'Market entry facilitation',
        'Spectrum planning and management',
        'Numbering plan administration',
      ],
    },
    {
      name: 'Technical Services',
      color: '#7C3AED',
      icon: '🔧',
      description: 'Provides technical expertise in spectrum management, type approval, infrastructure oversight and engineering support across all regulated sectors.',
      functions: [
        'Radio frequency spectrum management',
        'Equipment type approval',
        'National Radio Frequency Plan management',
        'Technical standards development',
        'Engineering inspections and assessments',
      ],
    },
    {
      name: 'Corporate Communications and Relations',
      color: '#DC2626',
      icon: '📣',
      description: 'Manages BOCRA\'s public communications, stakeholder engagement, media relations, consumer education and the organisation\'s public profile.',
      functions: [
        'Public relations and media engagement',
        'Stakeholder outreach and consultation',
        'Consumer education programmes',
        'Website and digital communications',
        'Events and publications management',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">About BOCRA</p>
          <h1 className="text-4xl font-bold mb-4">Organisational Structure</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA operates through five departments, each headed by a Director and accountable to the Chief Executive and the Board of Directors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Leadership Hierarchy */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Leadership Structure</h2>
          <div className="flex flex-col items-center gap-0">
            {/* Board */}
            <div className="w-full max-w-xs bg-[#002B7F] text-white rounded-xl p-4 text-center shadow-md">
              <p className="font-bold text-lg">Board of Directors</p>
              <p className="text-blue-200 text-sm">Governing Authority</p>
            </div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            {/* CEO */}
            <div className="w-full max-w-xs bg-[#1a4a9e] text-white rounded-xl p-4 text-center shadow-md">
              <p className="font-bold text-lg">Chief Executive</p>
              <p className="text-blue-200 text-sm">Organisational Direction & Vision</p>
            </div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            {/* Executive Management */}
            <div className="w-full max-w-xs bg-[#2DD4BF] text-white rounded-xl p-4 text-center shadow-md">
              <p className="font-bold text-lg">Executive Management</p>
              <p className="text-teal-50 text-sm">Senior Leadership Team</p>
            </div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            {/* Departments label */}
            <div className="text-center text-gray-400 text-sm font-medium mb-4">Five Departments (each led by a Director)</div>
          </div>

          {/* Department row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
            {departments.map((d) => (
              <div key={d.name} className="rounded-lg p-3 text-center text-white text-xs font-semibold shadow" style={{ backgroundColor: d.color }}>
                <div className="text-xl mb-1">{d.icon}</div>
                {d.name}
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Organisational Objectives</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              'Facilitating the entry of new communications service providers into the market',
              'Managing the radio frequency spectrum efficiently to avoid interference and maximise benefit',
              'Operating as a dynamic, open, transparent and respected organisation with competent and motivated staff',
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <span className="w-7 h-7 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Departments Detail */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Departments</h2>
          <div className="space-y-5">
            {departments.map((d) => (
              <div key={d.name} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: d.color }}></div>
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{d.icon}</span>
                      <h3 className="font-bold text-lg" style={{ color: d.color }}>{d.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Functions</h4>
                    <ul className="space-y-1.5">
                      {d.functions.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Contact BOCRA</h2>
          <p className="text-blue-200 mb-4">
            For enquiries directed to a specific department, contact BOCRA's main office and your query will be directed to the appropriate team.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-blue-100 text-sm">
            <div>
              <p className="font-semibold text-white">Address</p>
              <p>Plot 50671, Independence Avenue</p>
              <p>P/Bag 00495, Gaborone</p>
            </div>
            <div>
              <p className="font-semibold text-white">Phone</p>
              <p>+267 395 7755</p>
              <p>Fax: +267 395 7976</p>
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
