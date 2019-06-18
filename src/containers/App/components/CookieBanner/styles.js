const styles = theme => ({
  cookieBannerContainer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: '2rem 0.125rem',
    zIndex: 9999
  },
  cookieText: {
    textAlign: 'center',
    fontSize: '1.25rem'
  },
  acceptButton: {
    marginLeft: '5px'
  }
});

export default styles;