import * as React from "react";

interface EmailTemplateProps {
  userName: string;
  message: string;
}

export function EmailTemplate({ userName, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>Hello, {userName}!</h1>
      <p>{message}</p>
    </div>
  );
}
