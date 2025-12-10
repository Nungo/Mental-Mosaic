import { Link } from 'react-router-dom'

const Privacy = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: December 10, 2025</p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Introduction</h2>
              <p>
                Welcome to Mental Mosaic. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you about how we look after your personal data and tell you about your
                privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data We Collect</h2>
              <p className="mb-3">We may collect, use, store and transfer different kinds of personal data about you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> First name, last name, username</li>
                <li><strong>Contact Data:</strong> Email address</li>
                <li><strong>Wellness Data:</strong> Mood entries, journal entries, and usage preferences</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Usage Data:</strong> How you use our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How We Use Your Data</h2>
              <p className="mb-3">We use your personal data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our mental health services</li>
                <li>Track your mood and wellness trends</li>
                <li>Send you notifications and updates</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data Storage</h2>
              <p>
                Currently, your data is stored locally on your device using browser localStorage. This means your mood
                entries, journal entries, and preferences remain on your device and are not transmitted to our servers.
                We do not have access to this data unless you explicitly choose to sync it with our cloud services in the future.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data Security</h2>
              <p>
                We have implemented appropriate security measures to prevent your personal data from being accidentally
                lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees,
                agents, contractors, and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your Rights</h2>
              <p className="mb-3">Under data protection laws, you have rights including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to access:</strong> Request access to your personal data</li>
                <li><strong>Right to correction:</strong> Request correction of your personal data</li>
                <li><strong>Right to erasure:</strong> Request erasure of your personal data</li>
                <li><strong>Right to object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to data portability:</strong> Request transfer of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Third-Party Services</h2>
              <p>
                We may use third-party services such as analytics providers, cloud storage, and AI services. These
                third parties have their own privacy policies, and we encourage you to read them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at{' '}
                <a href="mailto:privacy@mentalmosaic.com" className="text-primary hover:underline">
                  privacy@mentalmosaic.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
