 export function formatTime(seconds: number) {
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_MONTH = 2592000;
    // Calcula a quantidade de cada unidade de tempo
    const months = Math.floor(seconds / SECONDS_IN_MONTH);
    seconds %= SECONDS_IN_MONTH;
    const days = Math.floor(seconds / SECONDS_IN_DAY);
    seconds %= SECONDS_IN_DAY;
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds %= SECONDS_IN_HOUR;
    const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);

    // Monta a string de resultado
    const result = [];
    if (months > 0) result.push(`${months} M`);
    if (days > 0) result.push(`${days} D`);
    if (hours > 0) result.push(`${hours} H`);
    if (minutes > 0) result.push(`${minutes} m`);

    // Retorna a string formatada
    return result.join(", ");
  }