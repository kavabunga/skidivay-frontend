const style = {
  header: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingX: { xs: '1rem', sm: '1.5rem' },
    paddingTop: { xs: '1rem', sm: '2.5rem' },
    paddingBottom: { xs: '1.5rem', sm: '2.5rem' },
    display: 'flex',
    flexDirection: 'row',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '24px',
  },
  iconButton: {
    padding: 0,
    margin: 0,
    border: '#7A757F 1px solid',
    borderRadius: '8px',
    width: '48px',
  },
} as const;

export default style;
