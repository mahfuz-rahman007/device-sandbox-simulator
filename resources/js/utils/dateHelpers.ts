/**
 * Format preset created date
 * Shows "Mon 15" for current year, "Mon 15, 2024" for other years
 */
export const formatPresetDate = (dateString: string): string => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: dateYear !== currentYear ? 'numeric' : undefined,
    });
};
