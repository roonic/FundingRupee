import React from "react";
import mainLogo from "../images/mainLogo.png"

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <span className="text-2xl font-bold">Funding</span>
//               <span className="text-2xl font-bold text-green-500">Rupee</span>
//             </div>
//             <p className="text-gray-400">
//               Nepal's platform for change, powered by you.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Platform</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="adasdda.html" className="hover:text-white transition-colors">
//                   How it works
//                 </a>
//               </li>
//               <li>
//                 <a href="nasdjas.html" className="hover:text-white transition-colors">
//                   Success stories
//                 </a>
//               </li>
//               <li>
//                 <a href="hem.html" className="hover:text-white transition-colors">
//                   Trust & safety
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Support</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="asdas.html" className="hover:text-white transition-colors">
//                   Help center
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Contact us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Community
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Legal</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Terms of service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Privacy policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Cookie policy
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>&copy; 2025 FundingRupee. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">Funding</span>
              <span className="text-xl font-bold text-green-600">Rupee</span>
            </div>
            <p className="text-gray-400 mb-4">Crowdfunding Nepal's Hopes, One Rupee Closer.</p>
            <div className="w-16 h-16 bg-white rounded-full shadow-md overflow-hidden flex items-center justify-center">
              <img 
                src={mainLogo}
                alt="FundingRupee Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Donate</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#efe" className="hover:text-white">Categories</a></li>
              <li><a href="fe#" className="hover:text-white">Top Campaigns</a></li>
              <li><a href="#fef" className="hover:text-white">Tax Benefits</a></li>
              <li><a href="fef#" className="hover:text-white">Donate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Fundraise</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="wewe" className="hover:text-white">Start a Campaign</a></li>
              <li><a href="asd" className="hover:text-white">Fundraising Categories</a></li>
              <li><a href="asda" className="hover:text-white">Signup As A Charity</a></li>
              <li><a href="sadsd" className="hover:text-white">Fundraising Tips</a></li>
              <li><a href="#\ww" className="hover:text-white">Beneficiary Fundraising</a></li>
              <li><a href="edef" className="hover:text-white">Charity Fundraising</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#sa" className="hover:text-white">About Us</a></li>
              <li><a href="#s" className="hover:text-white">Team</a></li>
              <li><a href="#dw" className="hover:text-white">Pricing</a></li>
              <li><a href="#wewe" className="hover:text-white">Transparency Report</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-gray-400 text-center">© 2024 FundingRupee</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
