import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link to="/dashboard" className="text-primary hover:text-primary-600 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: December 10, 2025</p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Agreement to Terms</h2>
              <p>
                By accessing or using Mental Mosaic, you agree to be bound by these Terms of Service. If you disagree
                with any part of these terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Description of Service</h2>
              <p>
                Mental Mosaic is a mental health and wellness tracking application designed to help users monitor their
                emotional well-being, journal their thoughts, and access mental health resources. This is a self-help tool
                and is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Medical Disclaimer</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="font-semibold mb-2">⚠️ Important Notice</p>
                <p>
                  Mental Mosaic is NOT a medical service and should NOT be used as a substitute for professional mental
                  health care. If you are experiencing a mental health crisis or emergency, please contact emergency
                  services immediately or call a crisis hotline.
                </p>
              </div>
              <p className="mb-3">Crisis Resources:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>National Suicide Prevention Lifeline: 988 (US)</li>
                <li>Crisis Text Line: Text "HELLO" to 741741</li>
                <li>Emergency Services: 911 (US)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">User Accounts</h2>
              <p className="mb-3">When you create an account with us, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Promptly update any changes to your information</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any illegal purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to the service</li>
                <li>Interfere with the proper working of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Privacy</h2>
              <p>
                Your use of the service is also governed by our Privacy Policy. Please review our{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to understand our
                practices regarding the collection and use of your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Content Ownership</h2>
              <p>
                You retain all rights to any content you create through the service, including journal entries and mood
                logs. By using the service, you grant us a limited license to store and process this content solely for
                the purpose of providing the service to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Limitation of Liability</h2>
              <p>
                Mental Mosaic and its affiliates shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of or inability to use the service. We do not guarantee that
                the service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by
                posting the new Terms of Service on this page and updating the "Last updated" date. Your continued use
                of the service after such changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Termination</h2>
              <p>
                We may terminate or suspend your account and access to the service immediately, without prior notice or
                liability, for any reason, including breach of these Terms. Upon termination, your right to use the
                service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                Mental Mosaic operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:support@mentalmosaic.com" className="text-primary hover:underline">
                  support@mentalmosaic.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
