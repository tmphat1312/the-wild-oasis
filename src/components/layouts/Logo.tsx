import logoSrc from "@/assets/images/logo-light.png";

export default function Logo() {
  return (
    <div className="grid justify-items-center">
      <img
        height={96}
        src={logoSrc}
        alt="Logo of the app"
        className="max-h-[96px]"
      />
    </div>
  );
}
