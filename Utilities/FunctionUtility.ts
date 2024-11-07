export const openDoxleHelpEmail = () => {
  const email = "help@doxle.com";
  const subject = "Support Inquiry";
  const body = `
      Hello,
  
      I have a question regarding your product. Can you please assist me with the following issue?
  
      Thank you,
      [Your Name]
    `;
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
};
export function addMiddleEllipsisText(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  const halfLength = Math.floor((maxLength - 3) / 2);
  const start = str.slice(0, halfLength);
  const end = str.slice(-halfLength);

  return `${start}...${end}`;
}
export const checkEmailValid = (value: string) => {
  const emailRegex = /.+\@.+\..+/;

  return emailRegex.test(value);
};
