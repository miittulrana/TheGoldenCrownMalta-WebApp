export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-surface/50 backdrop-blur-sm rounded-lg p-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
        <h2 className="text-2xl font-semibold text-primary mb-4">The Golden Crown Malta</h2>
        <p className="text-gray-400 mb-8">Last updated: February 10, 2025</p>

        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">1. Introduction</h3>
            <p>
              The Golden Crown Malta ("we," "our," or "us"), operating from Triq San Tumas, Il-Fgura, Malta, 
              is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and 
              protect your personal information when you use our website and mobile application (collectively, "Services").
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">2. Information We Collect</h3>
            <p className="mb-2">We collect the following personal information when you make a booking:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>City of residence</li>
              <li>Phone number</li>
              <li>Email address</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">3. How We Use Your Information</h3>
            <p className="mb-2">We use your personal information solely for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Managing your barbershop appointments</li>
              <li>Sending booking confirmations and reminders</li>
              <li>Contacting you about your appointment</li>
              <li>Improving our services</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">4. Legal Basis for Processing</h3>
            <p className="mb-2">We process your personal data based on:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The performance of services you request (booking appointments)</li>
              <li>Your consent</li>
              <li>Our legitimate business interests</li>
              <li>Compliance with legal obligations under Maltese and EU law</li>
            </ul>
          </section>

          {/* Data Storage and Security */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">5. Data Storage and Security</h3>
            <p>
              Your personal information is stored securely within the European Economic Area (EEA). 
              We implement appropriate technical and organizational measures to protect your data 
              against unauthorized access, alteration, or destruction.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">6. Data Retention</h3>
            <p className="mb-2">We retain your personal information only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">7. Your Rights</h3>
            <p className="mb-2">Under the GDPR and Maltese data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">8. Contact Information</h3>
            <p className="mb-2">For any privacy-related queries or to exercise your rights, contact us at:</p>
            <div className="pl-6">
              <p>The Golden Crown Malta</p>
              <p>Triq San Tumas</p>
              <p>Il-Fgura, Malta</p>
              <p>Phone: 7777 0765</p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">9. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on our website and updating the "Last updated" date.
            </p>
          </section>

          {/* Supervisory Authority */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">10. Supervisory Authority</h3>
            <p>
              You have the right to lodge a complaint with the Office of the Information and Data 
              Protection Commissioner (IDPC) in Malta if you believe we have violated your data 
              protection rights.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">11. Children's Privacy</h3>
            <p>
              Our Services are not intended for use by children under 16 years of age. We do not 
              knowingly collect personal information from children under 16.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}