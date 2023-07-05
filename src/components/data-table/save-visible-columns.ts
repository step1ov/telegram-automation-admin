const saveVisibleColumns = (key: string, data: Record<string, boolean>) => {
    localStorage.setItem(`visible-columns-${key}`, JSON.stringify(data));
}

export default saveVisibleColumns;
