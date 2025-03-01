// src/App.jsx
import React from "react";
import styled from "styled-components";

export default function App() {
  const Link = ({ className, children }) => (
    <a className={className}>{children}</a>
  );

  const StyledLink = styled(Link)`
    color: #bf4f74;
    font-weight: bold;
  `;

  return (
    <div>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  );
}
