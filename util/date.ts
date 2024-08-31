/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

/**
 * Formats a valid date string into one of the form: DD/MM/YYYY at {time}
 * @param date string of the format YYYY-MM-DDT{time}Z
 */
export const formatDate = (date: string) => {
    const dateSegment = date.split('T')[0].split('-');
    const dateInfo = `${dateSegment[2]}/${dateSegment[1]}/${dateSegment[0]}`;

    const timeSegment = date.split('T')[1].split(':');
    let hourSegment = parseInt(timeSegment[0], 10);
    const isPM = hourSegment >= 12;
    
    // If time is midnight (i.e 0), use 12
    hourSegment = hourSegment % 12 || 12;

    const timeInfo = `${hourSegment}:${timeSegment[1]} ${isPM ? 'PM' : 'AM'}`;

    return `${dateInfo} at ${timeInfo}`;
};
