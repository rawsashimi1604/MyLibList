import React, { useState } from "react";
import { useRouter } from "next/router";

import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import SubPageLayout from "../layout/SubPageLayout";

function LoginForm() {
  return (
    <SubPageLayout>
      <div className="flex flex-col lg:flex-row g-0">
        <LeftSection />
        <RightSection />
      </div>
    </SubPageLayout>
  );
}

export default LoginForm;
