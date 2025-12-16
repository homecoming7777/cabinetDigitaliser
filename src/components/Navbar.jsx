import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const baseLink =
    "block rounded-md px-3 py-2 text-sm font-medium transition";

  const activeLink =
    "bg-gray-950/50 text-white";

  const inactiveLink =
    "text-gray-300 hover:bg-[#C7DAD3] hover:text-black";

  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? activeLink : inactiveLink}`;

  return (
    <nav className="relative bg-[#19464c] py-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 text-2xl hover:bg-[#C7DAD3] hover:text-white"
            >
              {open ? "✖" : "☰"}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink to="/" end className={linkClass}>
                  Accueil
                </NavLink>
                <NavLink to="/patients" className={linkClass}>
                  Patients
                </NavLink>
                <NavLink to="/consultations" className={linkClass}>
                  Consultations
                </NavLink>
                <NavLink to="/rendez-vous" className={linkClass}>
                  Rendez-vous
                </NavLink>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <img
              src="https://www.svgrepo.com/show/482895/doctor.svg"
              className="h-15 w-15"
              alt="User"
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
            Accueil
          </NavLink>
          <NavLink to="/patients" className={linkClass} onClick={() => setOpen(false)}>
            Patients
          </NavLink>
          <NavLink to="/consultations" className={linkClass} onClick={() => setOpen(false)}>
            Consultations
          </NavLink>
          <NavLink to="/rendez-vous" className={linkClass} onClick={() => setOpen(false)}>
            Rendez-vous
          </NavLink>
        </div>
      )}
    </nav>
  );
}
