// src/components/Layout.jsx

import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="min-h-screen bg-[#121212] px-4 pb-16">
        {children}
      </div>
    </div>
  );
}
