import { titleFont } from "@/config/fonts";

/**
 * Componente Title
 * 
 * Este componente representa un título con un posible subtítulo.
 * Proporciona opciones para personalizar el texto del título, el subtítulo y las clases de estilo.
 */

interface Props {
    title: string;
    subtitle: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: Props ) => {
  return (
    <div className={`mt-3${ className}`}>
        <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}>
            {title}
        </h1>

        {
            subtitle && (
                <h3 className="text-xl mb-5">
                    {subtitle}
                </h3>
            )
        }

    </div>
  )
}
