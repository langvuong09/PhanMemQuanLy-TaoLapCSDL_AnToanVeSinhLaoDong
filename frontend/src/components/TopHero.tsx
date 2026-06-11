type TopHeroProps = {
    title?: string;
    actions?: React.ReactNode;
    className?: string;

    /** @deprecated Use `title` instead */
    lable?: string;
    /** @deprecated Use `actions` instead */
    component?: React.ReactNode;
}

const TopHero: React.FC<TopHeroProps> = ({
    title,
    actions,
    className,
    lable,
    component,
}: TopHeroProps) => {
    const displayTitle = title || lable || '';
    const displayActions = actions || component;

    return (
        <div className={`bg-white px-5 py-3 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between ${className || ''}`}>
            <h1 className="text-base font-bold text-gray-800">{displayTitle}</h1>
            {displayActions && (
                <>{displayActions}</>
            )}
        </div>
    )
}

export default TopHero;