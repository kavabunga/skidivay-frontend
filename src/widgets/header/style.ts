const style = {
  header: {
    paddingX: { xs: '16px', sm: '44px' },
    paddingTop: { xs: '16px', sm: '40px' },
    paddingBottom: { xs: '4px', sm: '40px' },
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
