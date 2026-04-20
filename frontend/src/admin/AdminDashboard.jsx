import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      loadData();
    }
  }, []);

  async function loadData() {
    try {
      const res = await fetch(`${API_URL}/api/forms/all`, {
        headers: { Authorization: token },
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        console.error("Failed to fetch forms");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteForm(id) {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    try {
      await fetch(`${API_URL}/api/forms/` + id, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      loadData();
    } catch (e) {
      console.error(e);
    }
  }

  function downloadCSV() {
    fetch(`${API_URL}/api/forms/export`, {
      headers: { Authorization: token },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "all_clients.csv";
        a.click();
      })
      .catch((err) => console.error(err));
  }

  function downloadPDF(item) {
    const doc = new jsPDF();
    let y = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - 2 * margin;

    const checkPageBreak = (neededSpace) => {
      if (y + neededSpace > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y = 20;
      }
    };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80); // Dark blue-gray
    doc.text("Lash & Brow Booking", pageWidth / 2, y, { align: "center" });
    y += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("Client Consent & Intake Form", pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const renderSectionTitle = (title) => {
      checkPageBreak(15);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 50);
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, y - 5, contentWidth, 8, 'F');
      doc.text(title, margin + 2, y + 1);
      y += 10;
    };

    const renderField = (label, value) => {
      const displayValue = value === true ? "Yes" : value === false ? "No" : (value || "None");
      const textLines = doc.splitTextToSize(String(displayValue), contentWidth - 60);
      
      checkPageBreak(textLines.length * 7);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(label + ":", margin, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(textLines, margin + 60, y);
      
      y += (textLines.length * 6) + 4;
    };

    // 🔹 STEP 1: BASIC INFO
    renderSectionTitle("Basic Information");
    renderField("Full Name", item.fullName);
    renderField("Phone Number", item.phoneNumber);
    renderField("Email Address", item.email);
    renderField("Date of Birth", item.dateOfBirth);

    // 🔹 STEP 2: EMERGENCY CONTACT
    renderSectionTitle("Emergency Contact");
    renderField("Name", item.emergencyContactName);
    renderField("Phone", item.emergencyContactPhone);

    // 🔹 STEP 3: SERVICE
    renderSectionTitle("Selected Service");
    renderField("Service", item.selectedService);

    // 🔹 STEP 4: MEDICAL HISTORY
    renderSectionTitle("Medical & Skin History");
    renderField("Conditions", item.medicalHistory?.join(", ") || "None");
    renderField("Allergies", item.allergiesDetails || "None");
    renderField("Other Details", item.medicalHistoryOther || "None");

    // 🔹 STEP 5: SERVICE SPECIFIC
    if (item.selectedService === "Lash Extension" && item.lashData) {
      renderSectionTitle("Lash Extension Details");
      renderField("Previous Extensions", item.lashData.previousLashExtensions);
      renderField("Last Fill Date", item.lashData.lastFillDate || "N/A");
      renderField("Previous Reactions", item.lashData.previousReactions || "None");
    }

    if (item.selectedService === "Lash Lift & Brow Lamination" && item.lashData) {
      renderSectionTitle("Lash Lift & Brow Details");
      renderField("Lash Lift Before", item.lashData.lashLiftBefore);
      renderField("Brow Lamination Before", item.lashData.browLaminationBefore);
      renderField("Patch Test", item.lashData.patchTestCompleted ? "Done" : "Declined");
      renderField("Previous Reactions", item.lashData.previousReactions || "None");
    }

    if (item.selectedService === "Facial" && item.facialData) {
      renderSectionTitle("Facial Details");
      renderField("Skin Type", item.facialData.skinType || "N/A");
      renderField("Concerns", item.facialData.concerns?.join(", ") || "None");
      renderField("Skincare Routine", item.facialData.skincareRoutine || "None");
    }

    // 🔹 STEP 6–9: CONSENT (MERGED)
    renderSectionTitle("Agreements & Consent");
    renderField("Understands Irritation", item.understandIrritation);
    renderField("Understands Variable Results", item.understandVariableResults);
    renderField("Followed Pre-Care", item.followedPreCareInstructions);
    renderField("Consent Given", item.consentProcedure);
    renderField("Information Correct", item.confirmInformation);
    renderField("Understands Risks", item.understandRisks);
    renderField("Released from Liability", item.releaseFromLiability);
    renderField("Will Avoid Heat", item.avoidHeat);
    renderField("Will Avoid Oil", item.avoidOil);
    renderField("Will Avoid Touching", item.avoidTouching);
    renderField("Will Follow Aftercare", item.followAftercare);
    renderField("Photography Consent", item.photographyConsent);

    // 🔹 STEP 10: SIGNATURE
    renderSectionTitle("Signature Verification");
    y += 10;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(item.signatureName, margin, y);
    
    doc.setDrawColor(150, 150, 150);
    doc.line(margin, y + 2, margin + 80, y + 2);
    
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Signed Electronically", margin, y);

    doc.text("Date: " + item.signatureDate, margin + 100, y);
    
    // Add page numbers at the bottom
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: "right" });
    }

    const safeName = item.fullName ? item.fullName.replace(/\s+/g, '_') : "Client";
    doc.save(`${safeName}_Consent_Form.pdf`);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-poppins relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-playfair">
            Admin Dashboard
          </h1>
          <button
            onClick={downloadCSV}
            className="button-primary whitespace-nowrap shadow-md"
          >
            Export All (CSV)
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold rounded-tl-2xl">Name</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Consent</th>
                <th className="px-6 py-4 font-semibold text-center rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr 
                  key={item._id} 
                  className="hover:bg-rose-50 transition-colors duration-200"
                  style={{ animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-semibold">
                      {item.selectedService}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.signatureDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.consentProcedure ? (
                      <span className="text-green-500 text-lg">✔️</span>
                    ) : (
                      <span className="text-red-500 text-lg">❌</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => setSelected(item)}
                    >
                      View
                    </button>
                    <button 
                      className="px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => downloadPDF(item)}
                    >
                      PDF
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => deleteForm(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No form submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
          {/* MODAL CONTENT */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900 font-playfair">Full Form Details</h2>
              <button 
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Step 1 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 1: Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="text-gray-500 block text-sm">Name</span> <span className="font-medium">{selected.fullName}</span></p>
                  <p><span className="text-gray-500 block text-sm">Phone</span> <span className="font-medium">{selected.phoneNumber}</span></p>
                  <p><span className="text-gray-500 block text-sm">Email</span> <span className="font-medium">{selected.email}</span></p>
                  <p><span className="text-gray-500 block text-sm">Date of Birth</span> <span className="font-medium">{selected.dateOfBirth}</span></p>
                </div>
              </section>

              {/* Step 2 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 2: Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="text-gray-500 block text-sm">Name</span> <span className="font-medium">{selected.emergencyContactName}</span></p>
                  <p><span className="text-gray-500 block text-sm">Phone</span> <span className="font-medium">{selected.emergencyContactPhone}</span></p>
                </div>
              </section>

              {/* Step 3 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 3: Selected Service</h3>
                <p className="font-medium inline-block px-4 py-2 bg-rose-50 text-rose-700 rounded-lg">{selected.selectedService}</p>
              </section>

              {/* Step 4 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 4: Medical & Skin History</h3>
                <div className="space-y-3">
                  <p><span className="text-gray-500 block text-sm">Conditions</span> <span className="font-medium">{selected.medicalHistory?.join(", ") || "None"}</span></p>
                  <p><span className="text-gray-500 block text-sm">Allergies</span> <span className="font-medium">{selected.allergiesDetails || "None"}</span></p>
                  <p><span className="text-gray-500 block text-sm">Other</span> <span className="font-medium">{selected.medicalHistoryOther || "None"}</span></p>
                </div>
              </section>

              {/* Step 5 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 5: Service Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selected.selectedService === "Lash Extension" && selected.lashData && (
                    <>
                      <p><span className="text-gray-500 block text-sm">Previous Extensions</span> <span className="font-medium">{selected.lashData.previousLashExtensions ? "Yes" : "No"}</span></p>
                      <p><span className="text-gray-500 block text-sm">Last Fill Date</span> <span className="font-medium">{selected.lashData.lastFillDate || "N/A"}</span></p>
                      <p className="md:col-span-2"><span className="text-gray-500 block text-sm">Previous Reactions</span> <span className="font-medium">{selected.lashData.previousReactions || "None"}</span></p>
                    </>
                  )}
                  {selected.selectedService === "Lash Lift & Brow Lamination" && selected.lashData && (
                    <>
                      <p><span className="text-gray-500 block text-sm">Lash Lift Before</span> <span className="font-medium">{selected.lashData.lashLiftBefore ? "Yes" : "No"}</span></p>
                      <p><span className="text-gray-500 block text-sm">Brow Lamination Before</span> <span className="font-medium">{selected.lashData.browLaminationBefore ? "Yes" : "No"}</span></p>
                      <p><span className="text-gray-500 block text-sm">Patch Test</span> <span className="font-medium">{selected.lashData.patchTestCompleted ? "Done" : "Declined"}</span></p>
                      <p className="md:col-span-2"><span className="text-gray-500 block text-sm">Previous Reactions</span> <span className="font-medium">{selected.lashData.previousReactions || "None"}</span></p>
                    </>
                  )}
                  {selected.selectedService === "Facial" && selected.facialData && (
                    <>
                      <p><span className="text-gray-500 block text-sm">Skin Type</span> <span className="font-medium">{selected.facialData.skinType || "N/A"}</span></p>
                      <p className="md:col-span-2"><span className="text-gray-500 block text-sm">Concerns</span> <span className="font-medium">{selected.facialData.concerns?.join(", ") || "None"}</span></p>
                      <p className="md:col-span-2"><span className="text-gray-500 block text-sm">Skincare Routine</span> <span className="font-medium">{selected.facialData.skincareRoutine || "None"}</span></p>
                    </>
                  )}
                </div>
              </section>

              {/* Step 6-9 */}
              <section>
                <h3 className="text-lg font-semibold text-rose-800 border-b border-rose-100 pb-2 mb-4">Step 6–9: Agreements & Consent</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                  <p className="flex items-center gap-2">{selected.understandIrritation ? "✔️" : "❌"} <span>Irritation Risks</span></p>
                  <p className="flex items-center gap-2">{selected.understandVariableResults ? "✔️" : "❌"} <span>Variable Results</span></p>
                  <p className="flex items-center gap-2">{selected.followedPreCareInstructions ? "✔️" : "❌"} <span>Pre-care Followed</span></p>
                  <p className="flex items-center gap-2">{selected.consentProcedure ? "✔️" : "❌"} <span>Consent Given</span></p>
                  <p className="flex items-center gap-2">{selected.confirmInformation ? "✔️" : "❌"} <span>Info Correct</span></p>
                  <p className="flex items-center gap-2">{selected.understandRisks ? "✔️" : "❌"} <span>Understands Risks</span></p>
                  <p className="flex items-center gap-2">{selected.releaseFromLiability ? "✔️" : "❌"} <span>Liability Released</span></p>
                  <p className="flex items-center gap-2">{selected.avoidHeat ? "✔️" : "❌"} <span>Avoid Heat</span></p>
                  <p className="flex items-center gap-2">{selected.avoidOil ? "✔️" : "❌"} <span>Avoid Oil</span></p>
                  <p className="flex items-center gap-2">{selected.avoidTouching ? "✔️" : "❌"} <span>Avoid Touching</span></p>
                  <p className="flex items-center gap-2">{selected.followAftercare ? "✔️" : "❌"} <span>Follow Aftercare</span></p>
                  <p className="flex items-center gap-2">{selected.photographyConsent ? "✔️" : "❌"} <span>Photography Consent</span></p>
                </div>
              </section>

              {/* Step 10 */}
              <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Step 10: Signature</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-gray-500 block text-sm">Signed By</span>
                    <span className="font-medium text-lg font-playfair italic">{selected.signatureName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-sm">Date</span>
                    <span className="font-medium">{selected.signatureDate}</span>
                  </div>
                </div>
              </section>

            </div>
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md px-8 py-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelected(null)}
                className="button-secondary"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}