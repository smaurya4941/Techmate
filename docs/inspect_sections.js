const fs = require('fs');
const html = fs.readFileSync('d:/Techmate/docs/bizznep-stitch-screen.html', 'utf8');

const sections = [
  'HeroSection',
  'ConsultationTiersBar',
  'KeyMetricsSection',
  'CompanyServicesSection',
  'BusinessCultureConsultancySection',
  'WhyChooseUsSection',
  'WorkProcessSection',
  'CallToActionBannerSection',
  'TestimonialSection',
  'FeaturedNewsSection',
  'ConsultationAppointmentSection'
];

sections.forEach(sec => {
  const regex = new RegExp(`<!-- BEGIN: ${sec} -->([\\s\\S]*?)<!-- END: ${sec} -->`, 'i');
  const match = html.match(regex);
  if (match) {
    console.log(`\n=================== ${sec} (length: ${match[1].length}) ===================`);
    console.log(match[1].slice(0, 800));
  } else {
    console.log(`\nSection not found: ${sec}`);
  }
});
