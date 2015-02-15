

<div class="account-username-box" data-userslug="{userslug}" data-uid="{uid}">
	<ul class="nav nav-pills account-sub-links">
		<li>
			<div class="btn-group">
				<a href="{config.relative_path}/user/{userslug}" class="btn btn-primary" id="profile"><i class="fa fa-user"></i> [[user:profile]]</a>
				<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
					<span class="caret"></span>
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu pull-right" role="menu">
					<li><a href="{config.relative_path}/user/{userslug}/following"><i class="fa fa-fw fa-users"></i> [[user:following]]</a></li>
					<li><a href="{config.relative_path}/user/{userslug}/followers"><i class="fa fa-fw fa-users"></i> [[user:followers]]</a></li>
					<li class="divider"></li>
					<li><a href="{config.relative_path}/user/{userslug}/topics"><i class="fa fa-fw fa-book"></i> [[global:topics]]</a></li>
					<li><a href="{config.relative_path}/user/{userslug}/posts"><i class="fa fa-fw fa-pencil"></i> [[global:posts]]</a></li>
					<li id="favouritesLink" class="hide"><a href="{config.relative_path}/user/{userslug}/favourites"><i class="fa fa-fw fa-heart"></i> [[user:favourites]]</a></li>
					<!-- BEGIN profile_links -->
					<li id="{profile_links.id}" class="plugin-link <!-- IF profile_links.public -->public<!-- ELSE -->private<!-- ENDIF profile_links.public -->"><a href="{config.relative_path}/user/{userslug}/{profile_links.route}"><i class="fa fa-fw {profile_links.icon}"></i> {profile_links.name}</a></li>
					<!-- END profile_links -->
				</ul>
			</div>
		</li>
		<!-- IF showSettings -->
		<li id="settingsLink"><a href="{config.relative_path}/user/{userslug}/settings"><i class="fa fa-gear"></i> [[user:settings]]</a></li>
		<li id="editLink"><a href="{config.relative_path}/user/{userslug}/edit"><i class="fa fa-pencil-square-o"></i> [[user:edit]]</a></li>
		<!-- ENDIF showSettings -->
	</ul>
</div>
<div>
<h1>History of Reddcoin Tips</h1>

<span><p>Accounts are working.</p></span>
<span><p>Currently a work in progress.</p></span>
<span><p>Pull data from various streams to populate.</p></span>
<span><p>Tablify.</p></span>
<hr />

A list of who has sent you tips
<ul>
	<!-- BEGIN test -->
	<li>
		{test.name}   {test.amount} RRD
	</li>
	<!-- END test -->
</ul>
</div>

<input type="hidden" template-variable="yourid" value="{yourid}" />
<input type="hidden" template-variable="theirid" value="{theirid}" />
