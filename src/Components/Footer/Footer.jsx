import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="bg-gray-400 border-t-2 border-t-black py-8">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <Logo width="100px" />
                    <p className="text-sm text-gray-600 mt-2">
                        &copy; 2023 DevUI. All Rights Reserved.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div>
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Features</Link>
                            </li>
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Pricing</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Help</Link>
                            </li>
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Terms</Link>
                            </li>
                            <li>
                                <Link className="text-base text-gray-900 hover:text-gray-700" to="/">Privacy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
