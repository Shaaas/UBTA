"use client";

import React, { useState, useEffect } from 'react';
import { UBTA_CONFIG } from '../../../config';

interface Application {
  id: string;
  fullName: string;
  phone: string;
  idNumber: string;
  kraPin: string;
  plateNumber: string;
  baseStage: string;
  submissionDate: string;
  status: string;
  filesUploaded: string[];
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Load submissions immediately from browser local environment mock storage matrix
  useEffect(() => {
    const data = localStorage.getItem('ubta_applications');
    if (data) {
      setApplications(JSON.parse(data));
    } else {
      // Seed default sandbox data if clean slate session
      const seed = [
        { id: "UBTA-REG-4921", fullName: "Boniface Mwangi Kariuki", phone: "0711999888", idNumber: "32984102", kraPin: "A009182341Z", plateNumber: "KMDQ 412X", baseStage: "Ngara – Fig Tree", submissionDate: "05/14/2026", status: "Pending Verification", filesUploaded: ["idCopy", "kraCopy", "passportPhoto"] },
        { id: "UBTA-REG-1082", fullName: "Douglas Omwamba", phone: "0722333444", idNumber: "28401923", kraPin: "A003418293M", plateNumber: "KMFE 110A", baseStage: "Githurai 45", submissionDate: "05/12/2026", status: "Approved / Hardware Active", filesUploaded: ["idCopy", "kraCopy", "passportPhoto"] }
      ];
      localStorage.setItem('ubta_applications', JSON.stringify(seed));
      setApplications(seed);
    }
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const updated = applications.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setApplications(updated);
    localStorage.setItem('ubta_applications', JSON.stringify(updated));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0B0F19] text-white px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Core Administrative Bar */}
        <div className="border-b border-gray-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-[#2096D4] uppercase tracking-widest bg-[#2096D4]/10 px-2.5 py-1 rounded">Security Hierarchy Clearances Only</span>
            <h1 className="text-3xl font-black mt-2">UBTA Core Central Management Desk</h1>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-lg px-4 py-2 text-xs font-mono">
            Total Application Node Records: <strong className="text-[#2096D4]">{applications.length}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns - Applications Index Table */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Incoming Registration Queues</h2>
            
            <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0B0F19] border-b border-gray-800 text-gray-400 font-bold text-[11px] uppercase tracking-wider">
                      <th className="p-4">Rider Details</th>
                      <th className="p-4">Operational Stage</th>
                      <th className="p-4">Compliance Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-800/20 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white">{app.fullName}</p>
                          <p className="text-[11px] font-mono text-gray-500 mt-0.5">{app.phone} | ID: {app.idNumber}</p>
                        </td>
                        <td className="p-4 text-gray-300 font-medium">
                          📍 {app.baseStage}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            app.status.includes('Approved') ? 'bg-[#00A651]/20 text-[#00A651]' : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => setSelectedApp(app)} className="px-3 py-1 bg-gray-800 border border-gray-700 text-xs font-bold rounded hover:border-[#2096D4] transition-colors">
                            Audit File
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Deep-Dive File Audit Details Panel */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Document Audit Verification Block</h2>
            
            {selectedApp ? (
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-gray-500 block">{selectedApp.id}</span>
                  <h3 className="text-lg font-black text-white mt-0.5">{selectedApp.fullName}</h3>
                  <p className="text-xs text-gray-400 mt-1">Submitted on system track: {selectedApp.submissionDate}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-800/60 text-xs font-mono">
                  <p><strong className="text-gray-500 font-sans">KRA PIN:</strong> <span className="text-white uppercase">{selectedApp.kraPin}</span></p>
                  <p><strong className="text-gray-500 font-sans">Motorbike Plate:</strong> <span className="text-[#F37121] uppercase">{selectedApp.plateNumber}</span></p>
                  <p><strong className="text-gray-500 font-sans">Verification Files:</strong> <span className="text-[#00A651]">{selectedApp.filesUploaded.length}/3 Valid Attachments</span></p>
                </div>

                <div className="pt-4 border-t border-gray-800/60 space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Execute Status Mutator Action</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => updateStatus(selectedApp.id, 'Approved / Hardware Active')} className="py-2 bg-[#00A651] text-white font-bold text-xs rounded-lg hover:opacity-90">
                      Approve & Activate
                    </button>
                    <button onClick={() => updateStatus(selectedApp.id, 'Flagged / Review Required')} className="py-2 bg-red-600 text-white font-bold text-xs rounded-lg hover:opacity-90">
                      Reject File
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#111827]/40 border border-gray-800 border-dashed rounded-2xl p-8 text-center text-xs text-gray-500">
                Select an active registration file from the tracking dashboard queue to begin vetting metrics.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
