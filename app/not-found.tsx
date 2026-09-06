import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-edit flex min-h-[70vh] flex-col justify-center py-28">
      <span className="eyebrow text-charcoal/50">Erro 404</span>
      <h1 className="font-display mt-3 text-[22vw] leading-[0.8] sm:text-[10rem]">
        Corte.
      </h1>
      <p className="mt-6 max-w-md text-xl text-charcoal/70">
        Essa cena não existe. Volte para a home e siga o roteiro.
      </p>
      <Link href="/" className="link-edit eyebrow mt-10 w-fit">
        Voltar ao início
        <span className="link-edit__line" aria-hidden />
      </Link>
    </div>
  );
}
