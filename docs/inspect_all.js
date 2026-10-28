const fs = require('fs');
const html = fs.readFileSync('d:/Techmate/docs/bizznep-stitch-screen.html', 'utf8');

function printSection(name) {
  const match = html.match(new RegExp(`<!-- BEGIN: ${name} -->([\\s\\S]*?)<!-- END: ${name} -->`, 'i'));
  console.log(`\n======================= ${name} =======================`);
  if (match) console.log(match[1]);
  else console.log('NOT FOUND');
}

printSection('BusinessCultureConsultancySection');
printSection('WhyChooseUsSection');
printSection('WorkProcessSection');
printSection('CallToActionBannerSection');
printSection('TestimonialSection');
printSection('FeaturedNewsSection');
printSection('ConsultationAppointmentSection');
