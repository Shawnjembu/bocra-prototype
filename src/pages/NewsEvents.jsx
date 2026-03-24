import { useState } from 'react';
import { 
  FileText, Calendar, Search, Filter, ChevronRight, MapPin, Clock, 
  Download, Bell, Play, Image, Users, Building2, Mic, AlertCircle,
  ExternalLink, Mail
} from 'lucide-react';

export default function NewsEvents({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('news');
  const [newsFilter, setNewsFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const news = [
    { id: 1, category: 'news', date: 'March 15, 2024', title: 'BOCRA Launches New Online Licensing Portal', excerpt: 'The new portal provides a streamlined experience for license applicants with faster processing times.', image: '/images/news/635036951_1347279590770115_3603102997177699115_n.jpg' },
    { id: 2, category: 'news', date: 'March 12, 2024', title: 'New Consumer Protection Guidelines Effective April 1', excerpt: 'Updated guidelines aim to strengthen consumer rights in the digital age.', image: '/images/news/642800723_1356812449816829_990481576931445014_n.jpg' },
    { id: 3, category: 'speech', date: 'March 10, 2024', title: 'Keynote Address: Digital Transformation in Botswana', excerpt: 'CEO discusses the future of communications sector at the annual tech summit.', image: '/images/news/647144726_1369366781894729_4830595175703378796_n.jpg' },
    { id: 4, category: 'statement', date: 'March 8, 2024', title: 'Statement on Spectrum Allocation for 5G', excerpt: 'BOCRA announces new spectrum allocation guidelines for 5G network deployment.', image: '/images/news/649328637_1370840881747319_2084495551010995861_n.jpg' },
    { id: 5, category: 'news', date: 'March 5, 2024', title: 'Botswana Internet Penetration Reaches 67.5%', excerpt: 'A significant increase from 61.3% in the previous year, according to new statistics.', image: '/images/news/649848734_1371119421719465_1734732717675627285_n.jpg' },
    { id: 6, category: 'statement', date: 'March 1, 2024', title: 'Regulatory Update on International Roaming', excerpt: 'New guidelines for international roaming charges effective immediately.', image: '/images/news/650228203_1368627048635369_4703481901894621783_n.jpg' },
    { id: 7, category: 'news', date: 'February 25, 2024', title: 'Annual Industry Awards Ceremony Announced', excerpt: 'BOCRA to host the 10th Annual Communications Industry Awards in May.', image: '/images/news/651237963_1370950965069644_7200932395616265379_n.jpg' },
    { id: 8, category: 'speech', date: 'February 20, 2024', title: 'Remarks at the National Digital Inclusion Forum', excerpt: 'Director General emphasizes the importance of digital literacy in rural communities.', image: '/images/news/652348434_1370958211735586_6074915002884439388_n.jpg' },
  ];

  const events = [
    { id: 1, title: 'Commission Meeting - Open Session', date: 'March 25, 2024', time: '09:00 AM', location: 'BOCRA HQ, Gaborone', type: 'meeting' },
    { id: 2, title: 'Public Consultation on Draft Regulations', date: 'March 28, 2024', time: '02:00 PM', location: 'Virtual', type: 'consultation' },
    { id: 3, title: 'Industry Stakeholder Workshop', date: 'April 5, 2024', time: '10:00 AM', location: 'BOCRA HQ, Gaborone', type: 'workshop' },
    { id: 4, title: 'Quarterly Performance Review Press Conference', date: 'April 15, 2024', time: '11:00 AM', location: 'BOCRA HQ, Gaborone', type: 'press' },
    { id: 5, title: 'Consumer Rights Awareness Campaign Launch', date: 'April 22, 2024', time: '09:00 AM', location: 'Multiple Locations', type: 'campaign' },
  ];

  const pressReleases = [
    { id: 1, date: 'March 15, 2024', title: 'BOCRA Launches New Online Licensing Portal', contact: 'Media Relations', contactEmail: 'media@bocra.bw' },
    { id: 2, date: 'March 12, 2024', title: 'New Consumer Protection Guidelines Effective April 1', contact: 'Consumer Affairs', contactEmail: 'consumer@bocra.bw' },
    { id: 3, date: 'March 10, 2024', title: 'Keynote Address: Digital Transformation in Botswana', contact: 'Corporate Communications', contactEmail: 'communications@bocra.bw' },
    { id: 4, date: 'March 8, 2024', title: 'Statement on Spectrum Allocation for 5G', contact: 'Technical Services', contactEmail: 'technical@bocra.bw' },
  ];

  const filteredNews = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = newsFilter === 'all' || n.category === newsFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">News & Events</h1>
          <p className="text-white/90">Latest updates, announcements, and upcoming events from BOCRA</p>
        </div>
      </div>

      {/* Subscribe Banner */}
      <div className="bg-[#2DD4BF] text-[#002B7F] py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium">Stay informed - Subscribe to our newsletter</span>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors">
            <Mail size={16} />
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'news', label: 'News', icon: FileText },
              { id: 'events', label: 'Events Calendar', icon: Calendar },
              { id: 'press', label: 'Press Resources', icon: Building2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#002B7F] border-b-2 border-[#002B7F]'
                    : 'text-gray-500 hover:text-[#002B7F]'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'news', label: 'News Releases' },
                  { value: 'speech', label: 'Speeches' },
                  { value: 'statement', label: 'Statements' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setNewsFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      newsFilter === filter.value
                        ? 'bg-[#002B7F] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            {filteredNews.length > 0 && newsFilter !== 'statement' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto overflow-hidden">
                    {filteredNews[0].image
                      ? <img src={filteredNews[0].image} alt={filteredNews[0].title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] flex items-center justify-center"><FileText size={64} className="text-white/50" /></div>
                    }
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="px-2 py-1 bg-[#2DD4BF]/20 text-[#002B7F] rounded font-medium">Featured</span>
                      <span>{filteredNews[0].date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E293B] mb-4">{filteredNews[0].title}</h2>
                    <p className="text-gray-600 mb-6">{filteredNews[0].excerpt}</p>
                    <button className="text-[#002B7F] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Read Full Story <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.slice(1).map((item) => (
                <article key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    {item.image
                      ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] flex items-center justify-center">
                          {item.category === 'speech' ? <Mic size={40} className="text-white/50" /> :
                           item.category === 'statement' ? <AlertCircle size={40} className="text-white/50" /> :
                           <FileText size={40} className="text-white/50" />}
                        </div>
                    }
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.category === 'speech' ? 'bg-purple-100 text-purple-800' :
                        item.category === 'statement' ? 'bg-orange-100 text-orange-800' :
                        'bg-[#2DD4BF]/20 text-[#002B7F]'
                      }`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                    <button className="mt-4 text-[#002B7F] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ChevronRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No news found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-4">Calendar</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-[#002B7F]">March</div>
                    <div className="text-gray-500">2024</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div key={idx} className="py-2 font-medium text-gray-500">{day}</div>
                    ))}
                    {[...Array(31)].map((_, idx) => {
                      const hasEvent = [25, 28].includes(idx + 1);
                      return (
                        <button
                          key={idx}
                          className={`py-2 rounded-lg text-sm ${
                            hasEvent 
                              ? 'bg-[#002B7F] text-white font-bold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-4">Event Types</h3>
                  <div className="space-y-2">
                    {[
                      { type: 'meeting', label: 'Commission Meetings', color: 'bg-[#002B7F]' },
                      { type: 'consultation', label: 'Public Consultations', color: 'bg-[#2DD4BF]' },
                      { type: 'workshop', label: 'Workshops', color: 'bg-[#F97316]' },
                      { type: 'press', label: 'Press Conferences', color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Events List */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-[#1E293B]">Upcoming Events</h3>
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.type === 'meeting' ? 'bg-[#002B7F] text-white' :
                            event.type === 'consultation' ? 'bg-[#2DD4BF] text-[#002B7F]' :
                            event.type === 'workshop' ? 'bg-[#F97316] text-white' :
                            'bg-purple-500 text-white'
                          }`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">{event.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-[#1E293B] mb-2">{event.title}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-[#002B7F] text-[#002B7F] rounded-lg font-medium hover:bg-[#002B7F] hover:text-white transition-colors">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Press Resources Tab */}
        {activeTab === 'press' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Media Contacts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-6">Media Contacts</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Media Relations', role: 'Press Inquiries', email: 'media@bocra.bw', phone: '+267 368 5105' },
                    { name: 'Corporate Communications', role: 'General Inquiries', email: 'communications@bocra.bw', phone: '+267 368 5106' },
                    { name: 'Consumer Affairs', role: 'Consumer Media', email: 'consumer@bocra.bw', phone: '+267 368 5110' },
                  ].map((contact, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-[#1E293B]">{contact.name}</div>
                      <div className="text-sm text-gray-500 mb-2">{contact.role}</div>
                      <div className="text-sm">
                        <a href={`mailto:${contact.email}`} className="text-[#002B7F] hover:underline">{contact.email}</a>
                      </div>
                      <div className="text-sm text-gray-500">{contact.phone}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Press Kit */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-6">Press Kit</h3>
                <div className="space-y-3">
                  {[
                    { title: 'BOCRA Logo (PNG)', size: '245 KB' },
                    { title: 'BOCRA Logo (SVG)', size: '12 KB' },
                    { title: 'Director General Photo', size: '1.2 MB' },
                    { title: 'BOCRA Branding Guidelines', size: '3.4 MB' },
                    { title: 'Fact Sheet 2024', size: '890 KB' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Download size={18} className="text-[#002B7F]" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Press Releases */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-6">Press Releases</h3>
              <div className="space-y-4">
                {pressReleases.map((release) => (
                  <div key={release.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{release.date}</div>
                      <h4 className="font-semibold text-[#1E293B]">{release.title}</h4>
                      <div className="text-sm text-gray-500 mt-1">Contact: {release.contact}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#002B7F] hover:text-[#002B7F] transition-colors">
                        <Download size={16} className="inline mr-1" />
                        PDF
                      </button>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#002B7F] hover:text-[#002B7F] transition-colors">
                        <ExternalLink size={16} className="inline mr-1" />
                        Online
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <p className="text-white/80 mb-6">Stay connected with BOCRA on social media for the latest updates</p>
              <div className="flex gap-4">
                {['Twitter', 'Facebook', 'LinkedIn', 'YouTube'].map((platform) => (
                  <button key={platform} className="px-6 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
