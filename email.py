def enviar():
	import smtplib

	gmail_user = "@gmail.com"
	gmail_pwd = ""
	FROM = '@gmail.com'
	TO = [gmail_user] #must be a list
	SUBJECT = "MERCADO"
	TEXT = 'Mercado bien'

	# Prepare actual message
	message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
	""" % (FROM, ", ".join(TO), SUBJECT, TEXT)
	try:
		#server = smtplib.SMTP(SERVER)
		server = smtplib.SMTP("smtp.gmail.com", 587) #or port 465 doesn't seem to work!
		server.ehlo()
		server.starttls()
		server.login(gmail_user, gmail_pwd)
		server.sendmail(FROM, TO, message)
		#server.quit()
		server.close()
	except:
		pass
		
enviar()