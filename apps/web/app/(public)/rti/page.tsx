import React from 'react'

export default function RTIPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-granite-100 p-8 md:p-12">
          <h1 className="font-serif text-heading-xl text-granite-900 font-bold mb-6 border-b border-granite-100 pb-4">
            Right to Information (RTI)
          </h1>
          
          <div className="prose prose-granite max-w-none">
            <p className="text-body text-granite-600 mb-6">
              The Right to Information Act, 2005 mandates timely response to citizen requests for government information. 
              The Department of Tourism, Government of Kanyakumari is committed to transparency and accountability.
            </p>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              Public Information Officer (PIO)
            </h3>
            <div className="bg-granite-50 p-6 rounded-xl border border-granite-100 mb-8">
              <p className="mb-2"><strong>Name:</strong> Thiru. S. Rajendran</p>
              <p className="mb-2"><strong>Designation:</strong> District Tourist Officer</p>
              <p className="mb-2"><strong>Office Address:</strong> Tourist Office, Beach Road, Kanyakumari - 629702</p>
              <p className="mb-2"><strong>Phone:</strong> 04652-246276</p>
              <p className="mb-0"><strong>Email:</strong> pio.tourism.kk@tn.gov.in</p>
            </div>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              Appellate Authority
            </h3>
            <div className="bg-granite-50 p-6 rounded-xl border border-granite-100 mb-8">
              <p className="mb-2"><strong>Name:</strong> Tmt. M. Selvi</p>
              <p className="mb-2"><strong>Designation:</strong> Regional Joint Director of Tourism</p>
              <p className="mb-2"><strong>Office Address:</strong> Regional Tourist Office, Madurai - 625001</p>
            </div>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              How to Apply
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-granite-600 mb-8">
              <li>Submit a written request in English or Tamil.</li>
              <li>Include your full name, address, and specific details of the information required.</li>
              <li>Attach the application fee of ₹10 (by cash, Demand Draft, or Court Fee Stamp).</li>
              <li>Send the application via post or submit it in person at the Tourist Office.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
