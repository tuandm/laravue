@extends('emails.email_layout')
@section('content')
  @csrf
 <table border="0" cellpadding="0" cellspacing="0" class="tbl">
	    <tr>
      @csrf
	    	<td class="td2">
			<p>Dear {{ $data['name']}}, </p>
      <p>Thank you for registering your Laravue account. To complete the registration process we just need to
         verify your email address. Please click on the following link to confirm your address.
          This link will take you directly to your account where you can start using Laravue. </p>

      <p>To activate your Laravue Cloud account:</p>
        <a class="link" href="{{ $data['url'] }}" title="Click">Click here</a>
        <br /> Or copy this link to your browser<br>
    		{{ $data['url'] }} </p>
          <p style="font-size: 15px;">Sincerely,<br>
      </tr>
	</table>
@endsection
