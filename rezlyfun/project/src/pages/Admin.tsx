import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, X, Eye, Filter, Search, Download } from 'lucide-react';
import { consultationAPI, Consultation } from '../lib/supabase';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200'
};

const statusLabels = {
  pending: 'Na čekanju',
  confirmed: 'Potvrđeno',
  cancelled: 'Otkazano',
  completed: 'Završeno'
};

export default function Admin() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadConsultations();
  }, []);

  // Add a refresh function
  const refreshConsultations = () => {
    loadConsultations();
  };

  const loadConsultations = async () => {
    try {
      setLoading(true);
      const data = await consultationAPI.getConsultations();
      setConsultations(data);
    } catch (err) {
      setError('Greška pri učitavanju rezervacija');
      console.error('Error loading consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Consultation['status']) => {
    try {
      setUpdatingStatus(id);
      await consultationAPI.updateConsultationStatus(id, newStatus);
      
      // Update local state
      setConsultations(prev => 
        prev.map(consultation => 
          consultation.id === id 
            ? { ...consultation, status: newStatus }
            : consultation
        )
      );
      
      if (selectedConsultation?.id === id) {
        setSelectedConsultation(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Greška pri ažuriranju statusa');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      consultation.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.phone.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Datum', 'Vrijeme', 'Ime', 'Prezime', 'Email', 'Telefon', 'Status', 'Opis'];
    const csvData = filteredConsultations.map(c => [
      c.consultation_date,
      c.consultation_time,
      c.first_name,
      c.last_name,
      c.email,
      c.phone,
      statusLabels[c.status],
      c.description.replace(/,/g, ';') // Replace commas to avoid CSV issues
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rezervacije_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavam rezervacije...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel - Rezervacije</h1>
              <p className="text-gray-600">Upravljanje konzultacijama i rezervacijama</p>
            </div>
            <button
              onClick={refreshConsultations}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Osvježi
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ukupno</p>
                <p className="text-2xl font-bold text-gray-900">{consultations.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Na čekanju</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {consultations.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Potvrđeno</p>
                <p className="text-2xl font-bold text-green-600">
                  {consultations.filter(c => c.status === 'confirmed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Završeno</p>
                <p className="text-2xl font-bold text-blue-600">
                  {consultations.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          {/* Demo mode notice */}
          {import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co' || !import.meta.env.VITE_SUPABASE_URL ? (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800 font-medium">
                  <strong>Demo mode:</strong> Prikazuju se demo rezervacije. Za prave rezervacije potrebno je konfigurirati Supabase.
                  Rezervacije se trenutno šalju samo preko email-a (Formspree).
                </p>
              </div>
            </div>
          ) : null}
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pretraži po imenu, email-u ili telefonu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Svi statusi</option>
                <option value="pending">Na čekanju</option>
                <option value="confirmed">Potvrđeno</option>
                <option value="cancelled">Otkazano</option>
                <option value="completed">Završeno</option>
              </select>
            </div>
            
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Izvezi CSV
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Consultations Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Datum & Vrijeme</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Klijent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kontakt</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(consultation.consultation_date).toLocaleDateString('hr-HR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="text-sm text-gray-500">{consultation.consultation_time}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {consultation.first_name} {consultation.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{consultation.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{consultation.phone}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <select
                        value={consultation.status}
                        onChange={(e) => updateStatus(consultation.id, e.target.value as Consultation['status'])}
                        disabled={updatingStatus === consultation.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[consultation.status]} ${
                          updatingStatus === consultation.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <option value="pending">Na čekanju</option>
                        <option value="confirmed">Potvrđeno</option>
                        <option value="cancelled">Otkazano</option>
                        <option value="completed">Završeno</option>
                      </select>
                    </td>
                    
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedConsultation(consultation)}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detalji
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredConsultations.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nema rezervacija koje odgovaraju filterima</p>
            </div>
          )}
        </div>

        {/* Consultation Detail Modal */}
        {selectedConsultation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Detalji rezervacije</h3>
                  <button
                    onClick={() => setSelectedConsultation(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedConsultation.first_name} {selectedConsultation.last_name}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedConsultation.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <p className="text-gray-900">{selectedConsultation.phone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedConsultation.consultation_date).toLocaleDateString('hr-HR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vrijeme</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedConsultation.consultation_time}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedConsultation.status]}`}>
                        {statusLabels[selectedConsultation.status]}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Opis razgovora</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 leading-relaxed">{selectedConsultation.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Rezervirano:</span> {new Date(selectedConsultation.created_at).toLocaleString('hr-HR')}
                  </div>
                  <div>
                    <span className="font-medium">Ažurirano:</span> {new Date(selectedConsultation.updated_at).toLocaleString('hr-HR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}