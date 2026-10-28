import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Wrench,
  Sparkles,
  ClipboardCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Turnkey Kitchen Planning & 2D/3D BIM Design',
      icon: <Compass className="w-8 h-8 text-[#174A83]" />,
      desc: 'Architectural space planning, work flow optimization (HACCP compliant receiving-to-dispatch flow), and detailed 2D/3D equipment placement layouts.',
      features: ['HACCP Workflow Zoning', 'AutoCAD & Revit 3D Layouts', 'Equipment Capacity Sizing'],
    },
    {
      title: 'MEP Utility Point Coordination',
      icon: <Zap className="w-8 h-8 text-[#174A83]" />,
      desc: 'Precise coordination schedules for electrical loads (kW/kVA), plumbing inlets/drains, gas piping sizing (LPG/PNG), and kitchen exhaust canopy CFM calculations.',
      features: ['Electrical Connection Schedules', 'Water & Drain Invert Points', 'Kitchen Exhaust Hood Sizing'],
    },
    {
      title: 'Custom AISI 304 Stainless Steel Fabrication',
      icon: <Sparkles className="w-8 h-8 text-[#174A83]" />,
      desc: 'Precision laser cutting, CNC bending, and TIG welding for custom stainless work tables, heavy-gauge sink units, mobile dish racks, and exhaust hoods.',
      features: ['Food-Grade AISI 304 Stainless', 'Seamless Deep-Drawn Sinks', 'Custom Dimension Flexibility'],
    },
    {
      title: 'On-Site Commissioning & Operator Training',
      icon: <ClipboardCheck className="w-8 h-8 text-[#174A83]" />,
      desc: 'Factory engineers oversee equipment installation, conduct electrical/thermal load tests, and train kitchen brigade chefs on digital combi oven programming.',
      features: ['Pre-Commissioning Checklist', 'Recipe Programming Support', 'Operator Safety Certifications'],
    },
    {
      title: 'Preventative Maintenance & Factory AMC',
      icon: <Wrench className="w-8 h-8 text-[#174A83]" />,
      desc: 'Scheduled quarterly preventive checkups, boiler descaling, thermostat calibrations, gasket replacements, and priority breakdown response.',
      features: ['Quarterly Preventative Audits', 'Genuine Factory Spares Inventory', 'Dedicated Toll-Free Helpdesk'],
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Engineering & Turnkey Services' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              END-TO-END PROJECT DELIVERY
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Commercial Kitchen Engineering &amp; Turnkey Services
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              From initial architectural concept to daily commercial operation, Techmate provides comprehensive technical design, fabrication, and after-sales maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F3F6FA] flex items-center justify-center mb-5">
                    {srv.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#344054] leading-relaxed mb-5">
                    {srv.desc}
                  </p>

                  <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#102B46] font-semibold">
                        <ShieldCheck className="w-4 h-4 text-[#174A83] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/request-quote"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            ))}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
